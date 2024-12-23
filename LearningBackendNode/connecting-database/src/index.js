import dotenv from "dotenv";
import mongoose from "mongoose";
import { DB_NAME } from "./constant.js";


dotenv.config({
    path: "./.env"
});
// This is better approach to connect the database, as databases are connected from outside. So it's good practice to connect it asyncly as it will decrease the overall time
// Immediate executable functions
console.log(`${process.env.MONGODB_URI}/${DB_NAME}`);

(async () => {
    try {
        let uri = `${process.env.MONGODB_URI}/${DB_NAME}`
        const connectionInstance = await mongoose.connect(uri);
        console.log(`MongoDB connection succefull!!\nDB-HOST:${connectionInstance.connection.host}`);
    } catch (error) {
        console.error("MongoDB connection failed. Error:", error);
        throw error;
    }
})();
