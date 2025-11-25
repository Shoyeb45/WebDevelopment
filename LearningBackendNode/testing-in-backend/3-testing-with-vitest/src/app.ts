import express from "express";
import z from "zod";
import { prisma } from "./db";

export const app = express();

app.use(express.json());

const SumSchema = z.object({
    a: z.number(),
    b: z.number()
});

app.post('/sum', async (req, res) => {

    const parsedData = SumSchema.safeParse(req.body);

    if (!parsedData.success) {
        res.status(411).json({
            message: "Invalid Data"
        });
        return;
    }
    const a = parsedData.data.a;
    const b = parsedData.data.b;

    const response = await prisma.sum.create({
        data: {
            a, b, sum: a + b
        }
    });

    res.status(200).json({
        answer: a + b,
        id: response.id
    });
})