// Using module
const logger = require("./logger");

function sayHello(name) {
    console.log("Hello " + name);
}

global.console.log(typeof"hii")

console.log(module)

console.log(typeof(logger));
console.log(logger);
console.log(logger.log("Hii"));

console.log(__filename); // Filename
console.log(__dirname); // Directory
