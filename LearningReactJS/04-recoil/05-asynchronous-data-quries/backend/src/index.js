import express from "express";
import cors from "cors";

const app = express();

app.use(cors({
    origin: "*"
}));
app.get("/notifications", (request, response) => {
    response.status(200).json({
        network: Math.floor(Math.random() * 100),
        jobs: Math.floor(Math.random() * 100),
        messaging: Math.floor(Math.random() * 100),
        notification: Math.floor(Math.random() * 100),
    })
});

app.listen(3000);