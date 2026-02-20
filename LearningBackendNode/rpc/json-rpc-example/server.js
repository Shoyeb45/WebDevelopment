import express from "express";
import bodyParser from "body-parser";
import { add, multiply, subtract } from "./method.js";

const app = express();

app.use(bodyParser.json());

app.post("/rpc", async (req, res) => {
    const { jsonrpc, method, params, id } = req.body;

    if (
        jsonrpc !== "2.0" ||
        !method ||
        !Array.isArray(params) ||
        params.length < 2
    ) {
        res.status(400).json({
            jsonrpc: "2.0",
            error: {
                message: "Invalid Request Body.",
            },
            success: false,
            id,
        });
        return;
    }

    const paramNums = params.map(Number);
    if (paramNums.some(isNaN)) {
        res.status(400).json({
            jsonrpc: "2.0",
            error: {
                message: "Invalid Method params",
            },
            success: false
        });
    }

    let result;

    switch (method) {
        case "add":
            result = add(paramNums[0], paramNums[1]);
            break;
        case "subtract":
            result = subtract(paramNums[0], paramNums[1]);
            break;
        case "multiply":
            result = multiply(paramNums[0], paramNums[1]);
            break;
        default:
            res.status(400).json({
                jsonrpc,
                error: {
                    message: "Invalid method name.",
                },
                success: false
            });
            return;
    }

    res.status(200).json({
        jsonrpc,
        data: { result, id },
        success: true,
    });
    return;
});

app.get("/rpc/version", async (req, res) => {
    res.status(200).json({
        jsonrpc: "2.0",
        success: true,
    });
});

app.listen(8000, () => {
    console.log("Server is runnning on port 8000.");
});
