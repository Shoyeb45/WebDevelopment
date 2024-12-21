export default function handler(req, res) {
    res.status(200).json({ message: "Hello from Vercel!" });
}

  
require("dotenv").config();
const express = require("express");

const app = express();
const port = 3000;

// / is used for route or main, can be accessed as : https://localhost:portNumber
app.get('/', (req, res) => {
    res.send("I am Shoyeb Ansari!");
});

// /twitter means in https://localhost:portNumber/twitter this path
app.get('/twitter', (req, res) => {
    res.send("Shoyeb45");
});

// /login means in https://localhost:portNumber/login this path
app.get("/login", (req, res) => {
    res.send("<h1>Please login</h1>")
});

// /youtube means in https://localhost:portNumber/youtube this path
app.get("/youtube", (req, res) => {
    res.send("<h2>Chai aur me</h2>")
});


app.listen(process.env.PORT, () => {
    console.log("Example app listening on port", process.env.PORT);
    
})
