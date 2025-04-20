import mongoose from "mongoose";

const accountSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User"
    }, 
    balance: {
        type: Number,
        default: 0,
    }
}, { timestamps: true });

export const Account = mongoose.model("Account", accountSchema);