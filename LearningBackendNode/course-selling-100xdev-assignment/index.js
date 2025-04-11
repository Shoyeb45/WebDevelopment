import express from "express";
import bodyParser from "body-parser";
import dotenv from 'dotenv';
import { connectDB } from "./src/db/connectDB.js";
import cookieParser from "cookie-parser";
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
dotenv.config({
    path: "./.env"
});

// Routes

// Admin Routes
import adminRoute from "./src/routes/admin.route.js";
app.use("/api/admin", adminRoute);

// user routes
import userRoute from "./src/routes/user.route.js";
app.use("/api/user", userRoute);

app.listen(3000, async () => {
    try {
        await connectDB();
        console.log("Server is running on: https://localhost:3000/");
        
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
})
