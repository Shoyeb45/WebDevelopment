"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_2 = require("mongoose");
const app = (0, express_1.default)();
app.use(express_1.default.json());
function connectDb() {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            console.log(process.env.MONGO_URI || "None");
            yield mongoose_1.default.connect(((_a = process.env) === null || _a === void 0 ? void 0 : _a.MONGO_URI) || "None", {});
        }
        catch (error) {
            // console.log("Error while connecting DB");
            console.error("Error while connecting DB", error);
            throw error;
        }
    });
}
const userSchema = new mongoose_2.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});
const User = mongoose_1.default.model("User", userSchema);
app.get("/users", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield User.find({});
        return res.status(200).json({
            "message": "Succesfull",
            "users": users
        });
    }
    catch (error) {
        return res.status(400).json({
            "message": "Error occured while getting all the users"
        });
    }
}));
app.post("/add-user", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password } = req.body;
        const user = yield User.create({
            name, email, password
        });
        return res.status(200).json({
            "message": "User created successfully"
        });
    }
    catch (error) {
        res.status(400).json({
            "message": "Error while adding user"
        });
    }
}));
connectDb()
    .then(() => {
    app.listen(3000, function () {
        console.log("App is up on port 3000");
    });
}).catch((err) => { throw err; });
