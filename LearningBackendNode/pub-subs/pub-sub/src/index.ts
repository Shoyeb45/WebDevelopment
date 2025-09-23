import { PubSubManager } from "./pubSubManager";

setInterval(() => {
    PubSubManager.getInstance().addUserToStock(Math.random().toString(), "APPL");
}, 5000)