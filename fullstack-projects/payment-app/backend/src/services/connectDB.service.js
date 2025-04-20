import mongoose from "mongoose";

export async function connectDB() {
    try {
        return await mongoose.connect(process.env.MONGODB_URI);
    } catch (error) {
        console.error(`[Error while connecting DB] \n${error}`);
        process.exit(1);
    }
}