import mongoose from "mongoose";

// Create object by using new 
const userSchema = new mongoose.Schema(
    {
        // Field is the key, and in value we can add another object with different properties.
        username: {
            type: String,
            required: true,
            unique: true,
        },
        emai: {
            type: String,
            required: true,
            unique: true,
            lowecase: true,
        },
        password: {
            type: String,
            required: true,
        },
    },
    {
        // it will add two more columns in schema : createdAt and updatedAt
        timestapms: true,
    },
);

// first arg : name of schema, and second arg : on what basis
export const User = mongoose.model("user", userSchema); 