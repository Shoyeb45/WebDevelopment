import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
    senderUser: {
        type: mongoose.Schema.ObjectId,
        ref: "User"
    },
    receiverUser: {
        type: mongoose.Schema.ObjectId,
        ref: "User"
    },
    amount: {
        type: Number,
    },
}, { timestamps: true });

export const Transaction = mongoose.model("Transaction", transactionSchema);