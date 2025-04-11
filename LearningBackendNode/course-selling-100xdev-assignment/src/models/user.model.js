import mongoose from "mongoose";
import { isPasswordCorrect } from "../utils/passwordMethods.js";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        index: true,
    }, 
    password: {
        type: String, 
        required: true,
    }, 
    refreshToken: {
        type: String,
    }, 
    courses: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "Course"
        }
    ]
}, { timestamps: true });



userSchema.methods.checkPassword = async function(userPassword) {
    return await isPasswordCorrect(userPassword, this.password);
}

export const User = mongoose.model("User", userSchema);