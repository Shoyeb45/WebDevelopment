import express from "express";
import cors from "cors";

const app = express()
const port = 3000;
app.use(cors());

app.get("/", (req, res) => {
        res.send("server is ready");
    }
);


app.get("/test", (req, res) => {
        res.send("Hii <br> This is Shoyeb from server side");
    }
);

app.listen(port, () => {
    console.log(`Server is running in port http://localhost:${port}`);
    }
);
