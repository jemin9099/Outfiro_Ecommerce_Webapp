const jwt = require('jsonwebtoken')
const User = require('../models/user') 
async  function authToken (req, res, next) {  
    try{
        const token = await req.headers['authorization']?.split(' ')[1];              
        
        if(!token){
            throw new Error('Token not found')
        }
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                return res.sendStatus(403); // Forbidden
            }
            req.user = user;
            next();
        });
    }catch(err){
        res.status(401).json({message:err.message,error:true,success:false,data:null})      
    } 
}

module.exports = authToken