var url = "http://mylogger.io/log"

function log(message) {
    // Send an HTTP Reques
    console.log("Function is called from different file");
    console.log(message);
    return "cnt";
}

module.exports.log = log;
// module.exports.endPoints = url;
