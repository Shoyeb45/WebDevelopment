"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const zod_1 = require("zod");
const app = (0, express_1.default)();
app.use(express_1.default.json());
const userProfileSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, { message: "Name cannot be empty" }),
    email: zod_1.z.string().email({ message: "Invalid email format" }),
    age: zod_1.z.number().min(18, { message: "You must be at least 18 years old" }).optional(),
});
app.post("/register", (req, res) => {
    const result = userProfileSchema.safeParse(req.body);
    console.log(result);
    if (!result.success) {
        res.json({
            message: result.error
        });
    }
    const updateData = result.data;
    res.json({
        message: "User updated",
        updateData
    });
});
app.listen(5000, () => {
    console.log("Server is running on https://localhost:5000");
});
