const userModel=require('../models/userModel');

const isValid = function (value) {
    if (typeof value == undefined || value == null) return false
    if (typeof value === 'string' && value.trim().length === 0) return false
    return true
}

const createUser=async function(req,res){
    try {
        const data =req.body;
        if(Object.keys(data).length>0){
            if(!isValid(data.name)){
                return res.status(400).send({status:false,msg:"name is required"})
            }
            if(!isValid(data.phone)){
                return res.status(400).send({status:false,msg:"phone is required"})
            }
            if(!isValid(data.email)){
                return res.status(400).send({status:false,msg:"email is required"})
            }
            if(!isValid(data.password)){
                return res.status(400).send({status:false,msg:"password is required"})
            }
            if(!isValid(data.address)){
                return res.status(400).send({status:false,msg:"address is required"})
            }
            if(!isValid(data.address.street)){
                return res.status(400).send({status:false,msg:"street is required"})
            }
            if(!isValid(data.address.city)){
                return res.status(400).send({status:false,msg:"city is required"})
            }
            if(!isValid(data.address.pincode)){
                return res.status(400).send({status:false,msg:"pincode is required"})
            }

            const saveData=await userModel.create(data);
            return res.status(201).send({status:true,msg:saveData})
        }
        else{
            return res.status(204).send({status:false,msg:"please enter some data"})
        }
        
    } catch (error) {
        return res.status(500).send({ERROR :error.message})
    }

    

    
}

const login=async function(req,res){
    try{

    }catch(error){

    }
}
module.exports.createUser=createUser;