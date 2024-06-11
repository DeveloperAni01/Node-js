const express = require('express')
const fs = require('fs')
const app = express();
const users = require("./MOCK_DATA.json")

const PORT = 3000

//Middleware -- plagin
/* app.use(express.urlencoded({extended: false})); */

app.use((req, res, next) => {
   /*  console.log(`I am MiddleWare one`);
    req.myUserName = "Ani"
    /* return res.json({msg: "hello from middle ware one"}) */ // return response from here
    fs.appendFile('log.txt', `${Date.now()}: ${req.ip}:${req.method}: ${req.path} \n`,(err, data) => {
        next(); 
    })
  //calling the next function */
})

/* app.use((req, res, next) => {
    // console.log("I am MiddleWare two", /* req.myUserName */
    /* return res.json({msg: "hello from middle ware one"}) */ // return response from here
//    res.end(`end...`)  
    // next();
// }) */

app.get('/users', (req, res) => {
    const html = `
    <ul>
     ${users.map((user) =>  `<li>${user.first_name}</li>`).join("")}
    </ul>
    `
    res.send(html)
        
 });


// REST API

app.get("/api/users", (req, res) => {
    /* console.log("i am in get route", req.myUserName); */
    return res.json(users)
});

/* /* app.get("/api/users/:id", (req, res) => { //:id for id (variable)
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id)
    return (res.json(user))
});

//patch request
app.patch('/api/users/:id', () =>{
  //edit user with id

  return res.json({status: 'pending'})
});

app.delete('/api/users/:id', () =>{
    //delete user with id
  
    return res.json({status: 'pending'})
  }); */


// Another Syntax

app.route('/api/users/:id').get((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id)
    return (res.json(user))
})
.patch((req, res) => {
    const body = req.body.id
    console.log('body', body)
    return res.json({status: "pending"})
})
.delete((req, res) => {
    return res.json({status: "pending"})
})

//post request 
app.post('/api/users', (req, res) => {
    const body = req.body
    // console.log(typeof(body));
    // console.log("body" , body);

    //for append in log(MOCK_DATA.json)

    users.push({...body, id: users.length + 1})
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err, data) => {
        return  res.json({status: "sucess", id: users.length })
    })

});

app.listen(PORT, () => console.log(`Server is Listening at ${PORT}`))