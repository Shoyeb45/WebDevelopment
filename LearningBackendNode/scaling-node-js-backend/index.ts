import express from "express";
import os from "os";
import cluster from "cluster";


const cpus = os.cpus().length;


if (cluster.isPrimary) {

    console.log(`Number of CPUs is ${cpus}`);
    console.log(`Primary ${process.pid} is running`);
    for (let i = 0; i < cpus; i++) {
        cluster.fork();
    }
    cluster.on("exit", (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);
        console.log("Let's fork another worker!");
        cluster.fork();
    });
} else {
    const app = express();
    console.log(`Worker ${process.pid} started`);
    app.get("/", (req, res) => {
        res.json({
            "message": "Working properly"
        })
    })

    app.get("/sum/:n", (req, res) => {
        let n = parseInt(req.params.n);
        let ans = 0;

        for (let i = 1; i <= n; i++) {
            ans += i;
        }

        res.json({
            "message": "Final count is " + ans + " and process id: " + process.pid
        })
    });

    app.listen(4005, () => {
        console.log("App is running on port 4005");
        
    })
}