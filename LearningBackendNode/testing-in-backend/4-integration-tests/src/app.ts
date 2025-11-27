import express from "express";
import { prisma } from "./db.js";

export const app = express();

app.use(express.json());

app.post("/sum", async (req, res) => {
    const a = req.body.a;
    const b = req.body.b;
    
    if (a > 1000000 || b > 1000000) {
        return res.status(422).json({
            message: "Sorry we don't support big numbers"
        })
    }
    const result = a + b;

    const request = await prisma.request.create({
        data: {
            a: a,
            b: b,
            answer: result,
            type: "ADD"
        }
    })
    
    res.json({ answer: result, id: request.id });
})