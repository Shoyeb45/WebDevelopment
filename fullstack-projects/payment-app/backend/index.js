import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { connectDB } from "./src/services/connectDB.service.js";
import cors from "cors";

const app = express()


// global middlewares
app.use(bodyParser.json());
app.use(express.urlencoded());
dotenv.config({
    path: "./.env"
});
app.use(cookieParser());
app.use(cors({
  origin: 'https://easy-pay-45.vercel.app', // Frontend URL
  methods: 'GET, POST, PUT, DELETE',
  allowedHeaders: 'Content-Type, Authorization',
  credentials: true // Allow cookies
}));

app.get("/", (_ ,res) => {res.json({msg:"Working......"})})
// User Routes
import userRoute from "./src/routes/user.route.js"
app.use("/api/v1/user", userRoute);

// account Routes
import accountRoute from "./src/routes/account.route.js";
app.use("/api/v1/account", accountRoute);

// admin routes
import adminRoute from "./src/routes/admin.route.js";
app.use("/api/v1/admin", adminRoute);

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 4000, () => {
        console.log(`Server is running on https:\\\\localhost:${process.env.PORT || 4000}\\`);
    })
  })
  .catch((err) => {
    console.error(`[Error MongoDB Connection]\n${err}`);
    process.exit(1);
  });
