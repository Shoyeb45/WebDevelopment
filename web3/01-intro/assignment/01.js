// Give me an input string that outputs a SHA-256 hash that starts with 00000

const crypto = require("crypto");

let str = 1, cryptoStr = crypto.createHash("sha256").update(str.toString()).digest("hex");

while (!cryptoStr.startsWith("00000")) {
    str++;
    cryptoStr = crypto.createHash("sha256").update(str.toString()).digest("hex");
}


console.log(str);
console.log(cryptoStr);

