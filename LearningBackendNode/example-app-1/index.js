const express = require("express");
const { createServer } = require("http");

const app = express();

// Define your routes
app.get('/', (req, res) => {
    res.send("I am Shoyeb Ansari!");
});

app.get('/twitter', (req, res) => {
    res.send("Shoyeb45");
});

app.get("/login", (req, res) => {
    res.send("<h1>Please login</h1>");
});

app.get("/youtube", (req, res) => {
    res.send("<h2>Chai aur me</h2>");
});

// Export the app as a Vercel serverless function
module.exports = (req, res) => {
    const server = createServer(app);
    server.emit('request', req, res);
};
