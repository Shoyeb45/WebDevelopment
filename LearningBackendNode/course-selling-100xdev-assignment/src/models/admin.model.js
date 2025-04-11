import mongoose from "mongoose";
import { isPasswordCorrect } from "../utils/passwordMethods.js";

const adminSchema = new mongoose.Schema({
    username : {
        type: String, 
        required: true,
        index: true,
        trim : true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    refreshToken: {
        type: String
    }
}, {timestamps: true})

adminSchema.methods.checkPassword = async function(userPassword) {
    return await isPasswordCorrect(userPassword, this.password);
}
export const Admin = mongoose.model("Admin", adminSchema); 