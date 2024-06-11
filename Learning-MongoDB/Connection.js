const mongoose = require('mongoose')


async function connectMOngoDb(url) {
    return mongoose
    .connect(url) //it returns a promise
}