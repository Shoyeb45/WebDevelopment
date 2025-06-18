import express from "express";
import mongoose from "mongoose";
import { Schema } from "mongoose";

const app = express();

app.use(express.json());

async function connectDb() {
    try {
        console.log(process.env.MONGO_URI || "None")
        await mongoose.connect(process.env?.MONGO_URI || "None", {})
    } catch (error) {
        // console.log("Error while connecting DB");
        console.error("Error while connecting DB", error); 
        throw error
    }
}   
const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    }, 
    password: {
        type: String,
        required: true
    }
}) 

const User = mongoose.model("User", userSchema);

app.get("/users", async (req: any, res: any) => {
    try {
        const users = await User.find({});
        return res.status(200).json({
            "message": "Succesfull",
            "users": users
        })
    } catch (error) {
        return res.status(400).json({
            "message" : "Error occured while getting all the users"
        })
    }
})


app.post("/add-user", async (req: any, res: any) => {
    try {
        const {name, email, password} = req.body;
        const user = await User.create({
            name, email, password
        });
        
        return res.status(200).json({
            "message" : "User created successfully"
        })
   } catch (error) {
        
        res.status(400).json({
            "message": "Error while adding user"
        })
    }
})
connectDb()
    .then(() => {
        app.listen(3000, function() {
            console.log("App is up on port 3000")
        })}
    ).catch((err) => {throw err})
