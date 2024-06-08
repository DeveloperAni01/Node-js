const http = require ('http')
const fs = require('fs')


const myServer = http.createServer ((req, res) => {
    // console.log('received req from client')

    const log = `${Date.now()}: ${req.url} New Request Received \n`
    fs.appendFile('log.txt',log, (err, data) => {
        switch(req.url) {
            case '/' : 
                res.end(`welcome to server !`);
                break;
            case '/about': 
                res.end(`hey I am Anirban Mondal`);
                break;
            default:
                res.end(`404 not found!`);
                break;
        }

        
    })
    
})


myServer.listen(8000, () => console.log(`Server is listening`))