// Continuos to 01
// What if I ask you that the input string should start with 100xdevs ? How would the code change?

const crypto = require("crypto");

const str = "100xdevs";
let input = 0;

let hashedString = crypto.createHash("sha256").update(str).digest('hex');

while (!hashedString.startsWith("00000")) {
    input++;
    hashedString = crypto.createHash("sha256").update(str + input.toString()).digest('hex');
}

console.log(str + input.toString());
console.log(hashedString);

// The inpur is called nonce
