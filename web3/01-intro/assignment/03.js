// What if I ask you to find a nonce for the following input - 
// harkirat => Raman | Rs 100
// Ram => Ankit | Rs 10

const crypto = require("crypto");

function findNonceOfPrefix(str, prefix) {
    let input = 0;
    let hashedString = crypto.createHash("sha256").update(str + input.toString()).digest("hex");

    while (!hashedString.startsWith(prefix)) {
        input++;
        hashedString = crypto.createHash("sha256").update(str + input.toString()).digest("hex");
    }

    return  {
        nonce : input,
        hash: hashedString
    };
}

let inp = `
harkirat => Raman | Rs 100
Ram => Ankit | Rs 10
`;
console.log(findNonceOfPrefix(inp, "00000"));
