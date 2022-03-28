const mongoose=require('mongoose');
const jwt=require('jsonwebtoken');
const ObejctId=mongoose.Types.ObjectId;
const userModel=require('../models/userModel')
const bookModel=require('../models/bookmodel');
// const { ObjectId } = require('bson');

const validateBookToken=async function(req,res,next){
    
        const token=req.headers["x-api-key"]

        if(!token.id){
            return res.status(400).send({status:false,msg:"token must be present"})
        }
        if(ObjectId.isValid(token.id)){
            return res.status(400).send("invalid token")                    
            
        }
        const findToken = jwt.verify(token,"12345")
        if(!findToken){return res.status.send("token is invalid")}
        next();
        

}



module.exports={
    validateBookToken:validateBookToken
}