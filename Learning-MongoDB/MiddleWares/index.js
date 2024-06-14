const fs = require('fs')

function logReqRes(filename) {
    return(req, res, next) => {
        fs.appendFile('file name', data, (err, data) => {
            next();
        })
    }
}


module.exports = {
    logReqRes
}