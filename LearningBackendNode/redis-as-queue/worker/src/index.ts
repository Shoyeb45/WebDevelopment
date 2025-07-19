import { createClient } from "redis";

const redisClient = createClient();

async function connectToRedis() {
    try {
        await redisClient.connect();
        console.log("Successfully connected to redis")
    } catch (error) {
        console.error(error);
    }
}



async function processSubmissions() {
    while (true) {
        try {
            const submission = await redisClient.brPop("submissions", 0);
            // convert it into object
            console.log("Got the subbmission...:");
            console.log(submission);
            
            const subm = JSON.parse(submission.element);
            console.table({...subm});
        } catch (error) {
            console.log(error);
            
        }
    }
}

(async () => {
    await connectToRedis();
    await processSubmissions();
})();