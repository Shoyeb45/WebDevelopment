import mongoose from "mongoose";


const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        default: "Course description",
    },
    price: {
        type: Number,
        required: true
    },
    imageLink: {
        type: String,
        required: true,
    },
    mentor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Admin"
    }
}, { timestamps: true });


export const Course = mongoose.model("Course", courseSchema);