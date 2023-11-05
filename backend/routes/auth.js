const express = require('express')
const router = express.Router()
const User = require('../modules/User')
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET
const fetchuser = require('../middlewares/fetchuser')

//POST: /signup
router.post('/signup',async(req,res)=>{
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const {name,email,password} = req.body;
    if(!name||!email||!password){
        return res.json({'error':'Please fill all the fields','success':false})
    }
    if(name.length<2){
        return res.json({'error':'Name must be atleast 2 characters','success':false})
    }
    else if((await User.find({"email":email})).length !=0){
        return res.json({'error':'An account with this email already exists.','success':false})
    }
    else if(!email.match(mailformat)){
        return res.json({'error':'Invalid email','success':false})
    }
    else if(password.length<5){
        return res.json({'error':'Password must be atleast 5 characters','success':false})
    }
    else if((await User.find({"email":email})).length !=0){
        return res.json({'error':'This email is already taken.','success':false})
    }
    else{
        const user = await User.create({name,email,password})
        const data = {user:{id: user.id}}
        const authtoken = jwt.sign(data,JWT_SECRET)
        return res.json({'success':true,'authtoken':authtoken})
    }
})

//POST : /login
router.post('/login',async(req,res)=>{
    const {email,password} = req.body;
    if(!email||!password){
        return res.json({'error':'Please fill all the fields','success':false})
    }
    const search = await User.find({"email":email})
    if(search.length==0){
        return res.json({'error':'No such email found','success':false})
    }
    else{
        if(search[0].password == password){
            const data = {user:{id: search[0].id}}
            const authtoken = jwt.sign(data,JWT_SECRET)
            return res.json({'success':true,'authtoken':authtoken})
        }
        else{
            return res.json({'error':'Incorrect password','success':false})
        }
    }
})

//POST : /fetchuser
router.post('/fetchuser',fetchuser,async (req,res)=>{
    try {
        const userid = req.user.id
        const user = await User.findById(userid).select("-password")
        return res.status(200).json({'user':user,'success':true})
    }
    catch(error){
        res.status(500).json({error:"Some error occured",success:false})
    }
})


module.exports = router;