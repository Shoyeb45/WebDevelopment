const crypto = require("crypto");

const str = "Shoyeb";

const hashedString = crypto.createHash("sha256").update(str);
console.log(hashedString.digest("hex")); // convert the sha256 hash to hexadecimals
