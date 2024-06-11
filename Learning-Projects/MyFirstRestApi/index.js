const express = require('express')
const fs = require('fs')
const app = express();
const users = require("./MOCK_DATA.json")

const PORT = 3000

//Middleware -- plagin
app.use(express.urlencoded({extended: false})); 

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
     console.log("i am in get route", req.url); 
   res.setHeader('X-myName', 'Anirban Mondal') // this is a custom header
    //Always add X to the custom headers
   console.log(req.headers);
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

app
    .route('/api/users/:id')
    .get((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id)
    if(!user) return res.status(404).json({msg: "user not found!"})
    return (res.json(user))
})
.patch((req, res) => {
    const id = Number(req.params.id);
    console.log('id', id)
    const user = users.find((user) => user.id === id)
    // console.log(typeof user)
    const updatedDta = req.body
    // const updateEmail = updatedDta["email"]
    // const updateAge = updatedDta["Age"]
    // console.log( updateAge, updateEmail);
    // user = ({...user, "email":updateEmail, "Age": updateAge})
    // console.log(user);
    // users.push({...users, email: updateEmail, Age: updateAge})
    const updatedUser = { ...user, ...updatedDta }; //modern syntax of the above 6 lines of code
    console.log(updatedUser);
    users[id-1]=updatedUser
    
    fs.writeFile('./MOCK_DATA.json',JSON.stringify(users), (err, data) => {
        return res.status(202).json({status: "success", updatedUser})
    })
})
.delete((req, res) => {
    const  userId = Number(req.params.id)
    // console.log(userId)
    const userIndex = users.findIndex((user) => user.id === userId)
    console.log(userIndex)
     /* Get the deleted user object using splice. Mind we need to get the object 
     and not array as returned by splice method, so '[0]' satisfies this requirement.
      The resulting object is just for the sake of displaying, you may neglect storing it
       if you don't want to display. */

       const delUser = users.splice(userIndex, 1)[0];
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {

        return res.json({ status: "success", delUser });
        
      });
    
})

//post request 
app.post('/api/users', (req, res) => {
    const body = req.body
    if(!body || !body.first_name || !body.last_name || !body.email || !body.gender || !body.Age || !body.job_title) return res.status(400).send(`PLease Fill All Data`)
    
    // console.log(typeof(body));
    // console.log("body" , body);
    //for append in log(MOCK_DATA.json)
    users.push({...body, id: users.length + 1})
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err, data) => {
        return  res.status(201).json({status: "sucess", id: users.length })
    })

});

app.listen(PORT, () => console.log(`Server is Listening at ${PORT}`))