const express = require('express')
const http = require('http')

const app = express(); // the app basically a handller function

app.get('/', (req, res) => {
    return res.send(`Hello! I am home page`)
});

app.get('/about', (req, res) => {
    res.send(`I am about section!`)
});

const myServer = http.createServer(app);

myServer.listen(8000, () => console.log('Server is Running'))
