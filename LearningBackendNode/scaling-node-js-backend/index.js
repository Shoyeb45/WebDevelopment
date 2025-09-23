"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const os_1 = __importDefault(require("os"));
const cluster_1 = __importDefault(require("cluster"));
const cpus = os_1.default.cpus().length;
if (cluster_1.default.isPrimary) {
    console.log(`Number of CPUs is ${cpus}`);
    console.log(`Primary ${process.pid} is running`);
    for (let i = 0; i < cpus; i++) {
        cluster_1.default.fork();
    }
    cluster_1.default.on("exit", (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);
        console.log("Let's fork another worker!");
        cluster_1.default.fork();
    });
}
else {
    const app = (0, express_1.default)();
    console.log(`Worker ${process.pid} started`);
    app.get("/", (req, res) => {
        res.json({
            "message": "Working properly"
        });
    });
    app.get("/sum/:n", (req, res) => {
        let n = parseInt(req.params.n);
        let ans = 0;
        for (let i = 1; i <= n; i++) {
            ans += i;
        }
        res.json({
            "message": "Final count is " + ans + " and process id: " + process.pid
        });
    });
    app.listen(4005, () => {
        console.log("App is running on port 4005");
    });
}
