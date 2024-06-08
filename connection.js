const mongoose = require("mongoose");
const logData = require("./utils/index");

async function connectDB() {
    try {
        mongoose.connect("mongodb://127.0.0.1:27017/short-url");
        console.log(`Db connected!`);
    }
    catch (err) {
        const logMessage = `Error : Mongoose Error | Time - ${Date.now()} | Message - ${err.message}`;
        logData("errors.txt", logMessage);
        process.exit(1);
    }
}

module.exports = connectDB;