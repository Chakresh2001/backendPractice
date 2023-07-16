const BlackListModel = require("../model/blackListmodel")
const jwt = require('jsonwebtoken');

const auth = async(req,res,next)=>{

   try {
    const token = req.headers.authorization

    if(!token){
        res.json({error:"Please Login"})
    }

    const blackListed = await BlackListModel.findOne({token:token})
    
    if(blackListed){
        res.json({error:"Token BlackListed please login again"})
    }

    jwt.verify(token, '123', function(err, decoded) {
        if(err){
            res.json({error:"Invalid Token plase login again"})
        }

        req.userInfo = decoded

        next()

    });
      
   } catch (error) {
    res.json({error:"internal error"})
   }
    

}

module.exports = auth