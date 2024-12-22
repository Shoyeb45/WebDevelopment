import express from "express";
import cors from "cors";

const app = express();
const port = 4000;
app.use(cors());
app.get("/", (req, res) => {
    res.send("Server is ready");
    }   
);

app.get("/possibleDomains", (req, res) => {
        let domains = [
            {
                id: 1,
                domain: "E-Commerce",
            },
            {
                id: 2,
                domain: "FinTech", 
            },
            {
                id: 3,
                domain: "Healthcare",
            },
            {
                id: 4,
                domain: "LMS",
            },
            {
                id: 5,
                domain: "EdTech",
            }
        ];

        res.json(domains);
    }

);

// If we run this we'll get error, so we need to add one key in pacakge.json :=> "type":"module"
app.listen(port, () => {
    console.log(`Server is running in port http://localhost:${port}`);
    }
);