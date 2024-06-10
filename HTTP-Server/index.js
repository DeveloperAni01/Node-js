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
               if(req.method === 'get')   res.end(`welcome to home !`);
                break;
            case '/about': 
                const username = myUrl.query.username
                res.end(`hey I am ${username}`);
                break;
            case "/search" :
                const search = myUrl.query.search_query;
                res.end(`Here is the result for ${search}`);
                break;
            case '/signup':
                if(req.method === 'get') res.end(`It is a SignUp form`);
                else if (req.method == 'post') {
                    //DB QUery
                    res.end(`Success`);
                }
            default:
                res.end(`404 not found!`);
                break;
        }

        
    })
    
})


myServer.listen(3000, () => console.log(`Server is listening`))