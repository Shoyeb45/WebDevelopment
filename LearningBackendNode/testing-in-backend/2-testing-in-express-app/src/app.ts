import express from "express";
import z from "zod";

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

    res.status(200).json({
        answer: a + b
    });
})