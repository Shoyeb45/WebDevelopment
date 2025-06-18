import express, { urlencoded } from "express";
import bodyParser from "body-parser";

import { PrismaClient } from "@prisma/client";
const app = express();
const prisma = new PrismaClient();
app.use(bodyParser.json());
app.use(express.urlencoded());

app.post("/signup", async function (req: any, res: any) {
    try {
        console.log(req.body)
        const { username, password, firstName, lastName } = req.body; 
        
        const reuslt = await prisma.users.create({
            data: {
                username, password, firstName, lastName
            }
        })
        console.log(reuslt);
        res.status(201).json({
            "message" : "Created successfully",
            "userId": reuslt.id
        })
        
    } catch (error: any) {
        res.status(500).json({
            "message" : "Error",
            "error" : error?.message || "Error"
        })
        return;
    }
})


app.post("/todos", async function (req: any, res: any) {
    try {
        const { userId, title, description } = req.body;
        const result = await prisma.todos.create({
            data: {
                title, description, user: {
                    connect: { id: userId }
                }
            }
        })        

        console.log(result)

        res.status(200).json({
            "message" : "Todo created successfully",
            "todo": result
        })
    } catch (error) {
        res.status(500).jsons({
            error
        })
    }
})

app.get("/todos", async function (req: any, res: any) {
    try {

        const userId = req.query.userId;
        console.log(userId)
        const result = await prisma.todos.findMany({
            where: {
                userId : parseInt(userId)
            }
        })
        console.log(result);
        
        res.status(201).json({
            "todos": result
        })
    } catch (error) {
        res.status(400).json({
            error
        })
    }
})

app.get("/todos-and-user", async function (req: any, res: any) {
    try {

        const userId = req.query.userId;
        const result = await prisma.todos.findMany({
            where: {
                userId : parseInt(userId)
            }, 
            select: {
                user:true,
                title: true,
                description: true,
                id: true
            }
        })
        console.log(result);
        
        res.status(201).json({
            "todos": result
        })
    } catch (error) {
        res.status(400).json({
            error
        })
    }
})



app.get("/", (req: any, res: any) => {
    res.status(200).json({
        "message" : "Running the server"
    })    
})
app.listen(3000, () => {
    console.log("App is up on 3000");
})