const mongoose=require('mongoose');
// const jwt=require('jsonwebtoken');
const jwt = require('jsonwebtoken');
const ObejctId=mongoose.Types.ObjectId;
const userModel=require('../models/userModel')
const bookModel=require('../models/bookmodel');
// const { ObjectId } = require('bson');

// const isValid = function(objectId) {
//     return mongoose.Types.ObjectId.isValid(objectId)
// }

// const validateBookToken=async function(req,res,next){
    
//         const token=req.headers["x-api-key"] 

//         // if(!token.id){
//         //     return res.status(400).send({status:false,msg:"token must be present"})
//         // }
//         // if(ObjectId.isValid(token.id)){
//         //     return res.status(400).send("invalid token")                    
            
//         // }
//         const findToken = jwt.verify(token,"12345")
//         if(!findToken){return res.status.send("token is invalid")}
//         next();
        

// }
const validateUser=async (req,res,next)=>{
    
    try {
        const data=req.body
        const token=req.header['x-api-key']
    const decodedToken = jwt.verify(token, '12345')
    if(!token ){
        return res.status(400).send("Token must be present....")
    }
    if(data.userId!=decodedToken.Id){
        return res.status(400).send("you are not authorized")
    }
    const findId=await userModel.find({_id:decodedToken.id})
    if(!findId){
        return res.status(403).send("you are not authorized")
    }

    next();    
    } catch (error) {
        return res.status(400).send(error.message)
    }
}



module.exports={
    // validateBookToken:validateBookToken,
    validateUser:validateUser
}