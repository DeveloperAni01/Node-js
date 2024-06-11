const express = require('express')

const router = express.Router()


// router.get('/users', async(req, res) => {
//     const allDbUsers = await User.find({})
//     try{
//         const html = `
//     <ul>
//      ${allDbUsers.map((user) =>  `<li>${user.firstName} - ${user.email}</li>`).join("")}
//     </ul>
//     `
//     res.send(html)
    
//     }
//     catch(err){
//         return res.json({msg: "user not found"})
//     }
// })


router.get('/', async(req, res) => {
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
router
    .route('/:id')
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
  

router.post('/', async(req, res) => {
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


module.exports = router