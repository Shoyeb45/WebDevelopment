import { Account } from "../models/account.model.js";
import { Transaction } from "../models/transaction.model.js";

import mongoose from "mongoose";

export const getBalance = async (req, res) => {
    try {
        const id = req.user._id;
        const balanceInfo = await Account.findOne({ user: id } );

        if (!balanceInfo) {
            res.status(500).json({
                error: "Error getting balance",
                ok: false
            });
            return;
        }

        res.status(201).json({
            balance: balanceInfo.balance,
            ok: true,
        });
        return;
    } catch (error) {
        console.error(`[Error while getting balance]\n${error}`);
        res.status(500).json({
            error: error?.message || "unexpected error while getting balance",
            ok: false
        });
        return;
    }
};

export const performTransaction = async (req, res) => {
    try {

        // start the mongodb session for committing the transaction
        const session = await mongoose.startSession();
        session.startTransaction();

        // transaction ensures that if the write operation fails then the update will not take place
        const { amount, receiverId } = req.body;
        
        const receiversAccount = await Account.findOne({ user: receiverId }).session(session);
        if (!receiversAccount) {
            await session.abortTransaction();
            res.status(500).json({
                error: "Couldn't find receiver account",
                ok: false
            });
            return;
        }
        const sendersAccount = await Account.findOne({ user: req.user._id }).session(session);
        
        if (!sendersAccount || sendersAccount.balance < amount) {
            await session.abortTransaction();
            res.status(500).json({
                error: "Couldn't find senders account or insufficient balance",
                ok: false
            });
            return;
        }
        
        // Perform the transaction

        // decrement from senders
        await Account.updateOne({ user: req.user._id}, {
            $inc: {
                balance: -amount
            }
        }).session(session);

        // increment from receivers
        await Account.updateOne({ user: receiversAccount.user}, {
            $inc: {
                balance: amount
            }
        }).session(session);
        // commit the transaction
        await session.commitTransaction();
        session.endSession();

        // update in transaction table
        await Transaction.create({
            senderUser: req.user._id,
            receiverUser: receiverId,
            amount: amount,
        });

        res.status(201).json({
            message: "Transaction completed successfully",
            senderId: req.user._id,
            receiverId: receiversAccount.user
        });
        return;
    } catch (error) {
        console.error(`[Error while performing transaction]\n${error}`);
        res.status(500).json({
            error: error?.message || "unexpected error while performing transaction",
            ok: false
        });
        return;
    }
};


export const getHistory = async (req, res) => {
    try {
        const id = req.user._id;

        const results = await Transaction.find({
            $or: [
                {
                    senderUser: id,
                }, 
                {
                    receiverUser: id,
                }
            ]
        }).populate("senderUser", "username firstName lastName")  // populate only `username` field
          .populate("receiverUser", "username firstName lastName");
        
        res.status(201).json({
            message: "Retrieved history",
            history: results
        });
        return;
    } catch (error) {
        console.error(`[Error while getting history]\n${error}`);
        res.status(500).json({
            error: error?.message || "unexpected error while getting history",
            ok: false
        });
        return;
    }
};