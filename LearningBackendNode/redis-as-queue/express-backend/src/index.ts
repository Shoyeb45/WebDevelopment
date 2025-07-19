import express from "express";
import { createClient } from "redis";

const client = createClient()


async function connectToRedis() {
    try {
        await client.connect();
        console.log("Connected to redis succesfully");

    } catch (error) {
        console.log(error);
    }
}

const app = express();

app.use(express.json());

connectToRedis()
    .then((data) => {
        app.listen(4000, () => {
            console.log("Server is running on : http://localhost:4000");
        })
    })
    .catch(err => {
        console.error(err);
    });

app.post("/submit", async (req, res) => {
    try {
        const submission = req.body;
        const { problemId, userId, code, language } = submission;

        console.log(`Processing submission for problemId ${problemId}...`);
        console.log(`Code: ${code}`);
        console.log(`Language: ${language}`);
        await client.lPush("submissions", JSON.stringify({problemId, userId, code, language}));

        res.json({
            "message": "successfully submitted",
        })
    } catch (error) {
        console.error(error);
        res.json({
            "message": "Failed to submit."
        })
    }
})

