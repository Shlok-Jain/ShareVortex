const express = require('express')
const router = express.Router()
const User = require('../modules/User')
const jwt = require('jsonwebtoken');
require('dotenv').config()
const JWT_SECRET = process.env.JWT_SECRET
const fetchuser = require('../middlewares/fetchuser')


router.post('/editname',fetchuser,async (req,res)=>{
    try {
        const userid = req.user.id
        // const user = await User.findById(userid)
        newname = req.body.name;
        await User.updateOne({_id:userid},{
            $set:{"name":newname}
        })
        return res.json({success:true})
    }
    catch(error){
        return res.status(500).json({error:"Some error occured. Try again later",success:false})
    }
})
module.exports = router