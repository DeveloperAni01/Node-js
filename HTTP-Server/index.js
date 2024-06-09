const http = require ('http')
const fs = require('fs')
const url = require('url')


const myServer = http.createServer ((req, res) => {
    // console.log('received req from client')

    const log = `${Date.now()}: ${req.url}  ${req.method} New Request Received \n`
    const myUrl = url.parse(req.url, true)
    // console.log(myUrl);
    console.log(myUrl.pathname);
    fs.appendFile('log.txt',log, (err, data) => {
        switch(/* req.url */ myUrl.pathname) {
            case '/' : 
                res.end(`welcome to server !`);
                break;
            case '/about': 
                const username = myUrl.query.username
                res.end(`hey I am ${username}`);
                break;
            default:
                res.end(`404 not found!`);
                break;
        }

        
    })
    
})


myServer.listen(8000, () => console.log(`Server is listening`))