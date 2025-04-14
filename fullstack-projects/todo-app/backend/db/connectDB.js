import mongoose from "mongoose";


export async function connectDB() {
    try {
        let uri = process.env.MONGODB_URI;

        const result = await mongoose.connect(uri);

        if (!result) {
            console.log("Something went wrong while connecting mongodb");
            return;
        }
        console.log("MongoDB connected successfully");
        return result;
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}