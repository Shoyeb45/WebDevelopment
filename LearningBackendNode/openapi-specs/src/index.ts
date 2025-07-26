import express from "express";

const app = express();

app.use(express.json());


type User = {
    name: string,
    age: string,
    sex: string
}
app.listen(3000, () => {
    console.log("App is running on port: 3000");
})

const users: User[] = [
    { name: "Shoyeb", age: "20", sex: "male"},
    { name: "Aryan", age: "20", sex: "male"},
    { name: "Najma", age: "21", sex: "female"},
]
app.get("/users", (req, res) => {
    res.json({
        users
    })
})