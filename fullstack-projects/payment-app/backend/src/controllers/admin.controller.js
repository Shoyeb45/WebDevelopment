import { Account } from "../models/account.model.js";

export const addBalance = async (req, res) => {
    try {
        let { id, balance } = req.body;
        balance = Number(balance);
        const isUpdated = await Account.findOneAndUpdate(
            { user: id },
            { $inc: { balance: balance } },
            { new: true } // returns updated document
        );

        console.table({ isUpdated });
        
        if (!isUpdated) {
            res.status(500).json({
                error: "Failed to add balance",
                ok: false,
            });
            return;
        }

        res.status(201).json({
            message: `Accunt balance for id : ${id} updated`,
            balance: isUpdated.balance
        });
        return;
    } catch (error) {
        console.error(`[Error while assigning balance]\n${error}`);
        res.status(500).json({
            error: error?.message || "Unexpected server error while assigning balance"
        });
    }
};