import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { upload } from "./middlewares/multer.middleware.js";
import { uploadOnCloudinary } from "./utils/cloudinary.js";

dotenv.config({
    path: './.env'
});

const app = express();
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.get("/", function(req, res) {
    console.log(req.originalUrl);
    console.log(req.query);
    
    res.send("Hii" + req.originalUrl);
});


app.post('/data', upload.single("file"), (req, res) => {
    if (!req) {
        return res.status(400).send("No file found!!!");
    }    
    const response = uploadOnCloudinary(req.file.path);
    
    res.send(response.url);
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});