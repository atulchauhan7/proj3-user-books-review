const bookModel=require('../models/bookmodel');
const jwt=require('jsonwebtoken');
const userModel = require('../models/userModel');
const { find } = require('../models/userModel');

const isValid = function (value) {
    if (typeof value == undefined || value == null) return false
    if (typeof value === 'string' && value.trim().length === 0) return false
    return true
}
const createBook=async (req,res)=>{
    try {
        const data =req.body;
        if(data.isPublished!=undefined){
            data.isPublished=new Date();
        }
        if(Object.keys(data).length>0){
            if(!isValid(data.title)){
                return res.status(400).send({status:false,msg:"title is required"})
            }
            if(!isValid(data.excerpt)){
                return res.status(400).send({status:false,msg:"excerpt is required"})
            }
            if(!isValid(data.category)){
                return res.status(400).send({status:false,msg:"category is required"})
            }
            if(!isValid(data.subcategory)){
                return res.status(400).send({status:false,msg:"subcategory is required"})
            }
            const findId=await userModel.findById(data.userId)
            if(!findId){
                return res.status(400).send({status:false,msg:"please provide valid object id"})
            }
            const checkTitle=await bookModel.findOne({title:data.title})
            if(checkTitle){
                return res.status(400).send({status:false ,msg : "title should be unique"});
            }
            

            const creature=await bookModel.create(data);
            return res.status(201).send({status:true,msg :creature})
           
        }
    } catch (error) {
        res.status(500).send({status:false,ERROR:error.message})
    }
    
}

const getBooks=async (req,res)=>{
    

   
    try {
        const data=req.query;
        if(!isValid(data.userId)){
            return res.status(400).send({status:false,msg:"data is required"})
        }
        const findId=await bookModel.find({ userId:data.userId,isDeleted:false})
        if(!findId){
            return res.status(400).send({status:false ,msg:"user id is not valid"})
        }
        

        // const checkIsDelete=await bookModel.findOne({isDelete:false}) 
        // if(!checkIsDelete){
        //     return res.status(400).send({status :false,msg:"provide data "})
        // }
        return res.status(201).send({status:true,msg:findId}) 

        
    } catch (error) {
        return res.status(500).send({status:false,msg:error.message})
    }
}


module.exports.createBook=createBook
module.exports.getBooks=getBooks
