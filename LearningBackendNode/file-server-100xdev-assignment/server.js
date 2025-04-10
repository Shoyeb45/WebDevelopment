import express from "express";
import fs from "fs";

const app = express();

app.use(express.json());

app.get("/files", (req, res) => {
    try {
        fs.readdir("./LearningBackendNode/file-server-100xdev-assignment/files", (err, files) => {
            if (err) {
                res.status(500).json({ err });
            }
            res.status(201).json({
                ok: true,
                files: files
            });
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            message: error?.message | "Unexpected error", 
            error : error
        }); 
    }
});




app.get("/files/:filename", (req, res) => {
    try {
        const filename = req.params.filename;

        fs.readFile(`./LearningBackendNode/file-server-100xdev-assignment/files/${filename}`, (err, fileContent) => {
            if (err) {
                res.status(404).json({ error: err });
            }
            
            res.status(200).json({
                ok : true,
                message: "File found",
                fileContent : fileContent.toString()
            });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error : error, message: error?.message | "Unexpected error" });
    }
});

app.get("*", (_, res) => {
    res.status(404).json({
        message: "Route not found"
    });
});
app.listen(3000);
