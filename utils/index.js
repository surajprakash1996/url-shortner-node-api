const fs =  require("fs");

async function logData(filename, data) {
    fs.appendFile(filename, data, (err) => {
        if( err ) {
            console.log("Error : ", err);
        }
    })
}

module.exports = logData;