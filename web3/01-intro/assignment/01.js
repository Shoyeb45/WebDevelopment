// Give me an input string that outputs a SHA-256 hash that starts with 00000

const crypto = require("crypto");

let str = 1, cryptoStr = crypto.createHash("sha256").update(str.toString()).digest("hex");
const startTime = new Date().getTime();
while (!cryptoStr.startsWith("11111")) {
    str++;
    cryptoStr = crypto.createHash("sha256").update(str.toString()).digest("hex");
}
const endTime = new Date().getTime();

console.log((endTime - startTime) / 1e3);
console.log(str);
console.log(cryptoStr);

