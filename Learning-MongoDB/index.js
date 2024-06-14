const express = require('express')
const {connectMongoDb} = require('./Connection.js')


const {logReqRes} = ('./MiddleWares')

const userRouter = require('./Routes/Routes.js')


const app = express()
const PORT = 8000;


//connection
connectMongoDb("'mongodb://127.0.0.1:27017/testing-database-2'")
    

// //Middleware -- plagin
app.use(express.urlencoded({extended: false})); 
app.use(logReqRes("log.txt"))


//Routers
app.use("/user", userRouter)


app.listen(PORT, () => console.log(`Server is listening at PORT: ${PORT}`))