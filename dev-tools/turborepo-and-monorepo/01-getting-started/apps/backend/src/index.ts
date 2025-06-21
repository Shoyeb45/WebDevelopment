import express from "express";
import { MY_CONSTANT, greet } from "@repo/common";
const app = express();

app.get("/health", (req: any, res: any) => {
    return res.status(200).json({
        "message": "All ok"
    })
})
app.listen(7070, () => {
    console.log("Server is running on port 7070");
    console.log(`${greet("Shoyeb")}`)
})