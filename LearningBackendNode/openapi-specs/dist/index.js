"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.listen(3000, () => {
    console.log("App is running on port: 3000");
});
const users = [
    { name: "Shoyeb", age: "20", sex: "male" },
    { name: "Aryan", age: "20", sex: "male" },
    { name: "Najma", age: "21", sex: "female" },
];
app.get("/users", (req, res) => {
    res.json({
        users
    });
});
