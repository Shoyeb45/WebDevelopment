import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
    title: {
        type: String,
    }, 
    description: {
        type: String
    },
    completed: {
        type: Boolean
    }
});

export const Todo = mongoose.model("Todo", todoSchema);