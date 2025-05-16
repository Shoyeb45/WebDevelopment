import express from "express";
import { z } from "zod";

const app = express();

app.use(express.json());
const userProfileSchema = z.object({
  name: z.string().min(1, { message: "Name cannot be empty" }),
  email: z.string().email({ message: "Invalid email format" }),
  age: z.number().min(18, { message: "You must be at least 18 years old" }).optional(),
});

app.post("/register", (req: any, res: any) => {
    const result = userProfileSchema.safeParse(req.body);

    console.log(result);
    if (!result.success) {
        res.json({
            message: result.error
        })
    }
    const updateData = result.data;

    res.json({
        message: "User updated",
        updateData
    });
})

app.listen(5000, () => {
    console.log("Server is running on https://localhost:5000");
});
