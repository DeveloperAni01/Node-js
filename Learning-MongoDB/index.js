const express = require('express')
const mongoose = require('mongoose')

const app = express()
const PORT = 8000;

//connecttion of mongoose
mongoose
    .connect('mongodb://127.0.0.1:27017/testing-database-2') //it returns a promise
    .then(() => console.log("MongoDB is Connected Successfully"))
    .catch((err) => console.log("DB is not connected"))

//Schema
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String
    },
    gender: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    
    jobTitle: {
        type: String,
    }
}, {timestamps: true})

const User = mongoose.model('user', userSchema)


// //Middleware -- plagin
app.use(express.urlencoded({extended: true})); 



app.get('/users', async(req, res) => {
    const allDbUsers = await User.find({})
    try{
        const html = `
    <ul>
     ${allDbUsers.map((user) =>  `<li>${user.firstName} - ${user.email}</li>`).join("")}
    </ul>
    `
    res.send(html)
    
    }
    catch(err){
        return res.json({msg: "user not found"})
    }
})


app.get('/allusers', async(req, res) => {
    const allDbUsers = await User.find({})
    try{
        // res.header("X-myName", "Ani")
        return res.json(allDbUsers)
    }
    catch(error){
        console.log('error');
    }
})

//routes
app
    .route('/users/:id')
    .get(async(req, res) => {
        const user = await User.findById(req.params.id)
        return res.status(200).json(user)
    })
    .patch(async(req, res) => {
        await User.findByIdAndUpdate(req.params.id, /* data must have to come from the frontend through body */ )
    })
    .delete(async(req, res) => {
        await User.findByIdAndDelete(req.params.id)
        res.send("Successfully Deleted")
    })
  

app.post('/users', async(req, res) => {
    const body = req.body
    console.log(body);
    if(!body ||
        !body.firstName || 
        !body.lastName ||
        !body.gender || 
        !body.email || 
        !body.jobTitle
    ){
        return res.status(400).json({msg: "Please Fill up the All Req....."})
    }

   const createdUser =  await User.create({
        firstName: body.firstName,
        lastName: body.lastName,
        gender: body.gender,
        email: body.email,
        jobTitle: body.jobTitle
    });

    console.log("result :", createdUser);
    return res.status(201).json({msg: "success", createdUser})
})

    

app.listen(PORT, () => console.log(`Server is listening at PORT: ${PORT}`))