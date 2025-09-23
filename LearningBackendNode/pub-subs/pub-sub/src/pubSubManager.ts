import { RedisClientType, createClient } from "redis";
export class PubSubManager {
    private static instance: PubSubManager;
    private subscriptions: Map<string, string[]>;
    private redisClient: RedisClientType;

    private constructor() {
        this.redisClient = createClient();
        this.redisClient.connect();
        this.subscriptions = new Map();
    }

    static getInstance() {
        if (!PubSubManager.instance) {
            PubSubManager.instance = new PubSubManager();
        }
        return PubSubManager.instance;
    }

    addUserToStock(userId: string, stock: string) {
       if (!this.subscriptions.get(stock)) {
            this.subscriptions.set(stock, []);
       }
       this.subscriptions.get(stock)?.push(userId);

       if (this.subscriptions.get(stock)?.length == 1) {
        this.redisClient.subscribe(stock, (msg) => {
            this.handleMessage(stock, msg);
        })
       }
    }

    removeUserFromStock(userId: string, stock: string) {
       if (this.subscriptions.has(stock)) {
            this.subscriptions.set(stock, this.subscriptions.get(stock)?.filter(uId => uId != userId) || []);
            if (this.subscriptions.get(stock)?.length === 0) {
                this.redisClient.unsubscribe(stock);
                console.log("Unsubscribed to stock, " + stock);
            }
       }
    }

    private handleMessage(stock: string, message: string) {
        console.log(`Message received on channel ${stock}: ${message}`);
        this.subscriptions.get(stock)?.forEach((sub) => {
            console.log(`Sending message to user: ${sub}`);
        });
    }

    // Cleanup on instance destruction
    public async disconnect() {
        await this.redisClient.quit();
    }
}