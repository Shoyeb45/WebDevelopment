import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        index: true,
    },
    password: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    }, 
    lastName: {
        type: String,
        required: true,
    }, 
    email: {
        type: String,
        required: true,
    },
    refreshToken: {
        type: String,
    }, 
}, { timestamps : true});

userSchema.methods.generateAccessToken = function() {
    return jwt.sign({
        _id: this._id, // id from database  
        email: this.email,
        username: this.username,
    }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "7d" });
}

userSchema.methods.generateRefreshToken = function() {
    return jwt.sign({
        _id: this._id, // id from database  
    }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "30d" });
}

export const User = mongoose.model("User", userSchema);

