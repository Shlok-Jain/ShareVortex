var jwt = require('jsonwebtoken');
const User = require('../modules/User');
const JWT_SECRET = process.env.JWT_SECRET;

const fetchuser = async(req,res,next)=>{
    const token = req.header('authtoken')
    if(!token){
        res.status(401).json({"error":"Please login again","success":false})
    }
    try {
        const data = jwt.verify(token,JWT_SECRET)
        const user = await User.findOne({'id':data.user.id})
        if(user){
            req.user = data.user
        }
        else{
            res.status(401).json({"error":"Please login again","success":false})
        }
    } catch (error) {
        console.log(error)
        res.status(401).json({"error":"Please login again","success":false})
    }
    
    next()
}

module.exports = fetchuser