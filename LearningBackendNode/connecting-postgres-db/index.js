import express from "express";
import bodyParser from "body-parser";
import { createUser, deleteUser, getUser, getUsers, updateUser } from "./userFunctions.js";
const app = express();

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

const port = 3030;
app.listen(port, () => {
    console.log(`https://localhost:${port}/`);
});

app.get("/", (req, res) => {
    res.send("app");
})

app.get("/getusers", getUsers);

app.get("/getuser/:id", getUser);

app.post("/createUser", createUser);

app.put("/updateUser/:id", updateUser);

app.delete("/deleteUser/:id", deleteUser);