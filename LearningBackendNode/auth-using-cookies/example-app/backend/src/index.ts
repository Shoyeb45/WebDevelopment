import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import jwt, { JwtPayload } from "jsonwebtoken";

const JWT_SECRET = "test1234";

const app = express();

app 
  .use(cookieParser())
  .use(express.urlencoded())
  .use(express.json())
  .use(cors({
      credentials: true,
      origin: "http://localhost:5173"
  }));


app.post("/api/login", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const token = jwt.sign({
        id: 10
    }, JWT_SECRET);

    res. 
      cookie("token", token)
      .status(200)
      .json({
        "message" : "User logged in successfully"
      });
    return;
});

app.get("/api/user", (req, res) => {
    const token = req.cookies.token;
    if (!token) {
        res.json({
            "error" : "No cookies"
        });
        return;
    }
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    res.json({
        userId: decoded.id
    })
});

app.get("/api/logout", (req, res) => {
    res.clearCookie("token");
    res.json({
        "message": "Logged out!"
    })
})
app.get("/", (req, res) => {
    res.status(200).json({
        "message": "The server is up"
    })
});


app.listen(3000, () => {
    console.log("The app is running on port 3000")
})