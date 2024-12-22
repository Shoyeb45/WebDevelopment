import mongoose from "mongoose";

const todoSchemma = new mongoose.Schema(
    {
        content: {
            type: String,
            required: true,
        },
        complete: {
            type: Boolean,
            default: false,
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        // subTodo is an array of object whose reference is SubTodo schema
        subTodo : {
            type: [
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "SubTodo",
                }
            ]
        }
    }
    ,
    {
        timestamps: true,
    }
);

export const Todo = mongoose.model("Todo", todoSchemma); 