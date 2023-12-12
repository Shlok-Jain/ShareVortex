var jwt = require('jsonwebtoken');
require('dotenv').config()
const User = require('../modules/User');
const JWT_SECRET = process.env.JWT_SECRET;

const fetchuser = async(req,res,next)=>{
    const token = req.header('authtoken')
    try {
        const data = jwt.verify(token,JWT_SECRET)
        const user = await User.findById(data.user.id)
        if(user){
            req.user = data.user
        }
        else{
            return res.status(401).json({"error":"Please login again","success":false})
        }
    } catch (error) {
        console.log(error)
        return res.status(401).json({"error":"Please login again","success":false})
    }
    
    next()
}

module.exports = fetchuser