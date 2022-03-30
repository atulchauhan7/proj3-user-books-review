const bookModel=require('../models/bookmodel');
const jwt=require('jsonwebtoken');
const userModel = require('../models/userModel');
const { find } = require('../models/userModel');
const { default: mongoose } = require('mongoose');
const bookmodel = require('../models/bookmodel');

// const isValid = function (value) {
//     if (typeof value == undefined || value == null) return false
//     if (typeof value === 'string' && value.trim().length === 0) return false
//     return true
// }
const isValid =function (value){
    if(typeof value==='undefined'||typeof value==null) return false
    if(typeof value ===String||value.trim().length===0) return false
    return true
}
const isValidObjId=function(userId){
    return mongoose.Types.ObjectId.isValid(userId)
}
const createBook=async (req,res)=>{
    try {
        const data =req.body;
        data.releasedAt=Date.now()
        // const review=await reviewModel.find(data)
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
    const filter={}
    filter.isDeleted=false
    try {
        const data=req.query;
        if((!data)){
            return res.status(400).send({status:false,msg:"data is required"})
        }
        
        if(isValid(data.userId)){
            filter.userId = data.userId
            // const findUserId=await userModel.find({_id:data.userId})
            // if(!findUserId) return res.status(400).send("please enter valid userId")
        }
        if(isValid(data.category)){
            filter.category = data.category
        }
        if(isValid(data.subcategory)){
            filter.subcategory = data.subcategory          
        }
        const findId=await bookModel.findOne(filter).select({_id:1,title:1,excerpt:1,userId:1,category:1,releasedAt:1}).sort({title:1})
        if(!findId){
            return res.status(400).send({status:false ,msg:"user id is not found"}) 
        }
        

        // const checkIsDelete=await bookModel.findOne({isDelete:false}) 
        // if(!checkIsDelete){
        //     return res.status(400).send({status :false,msg:"provide data "})
        // }
        return res.status(200).send({status:true,msg:findId}) 

        
    } catch (error) {
        return res.status(500).send({status:false,msg:error.message})
    }
}
const getBooksById=async (req,res)=>{
    try {
    const data =req.params.bookId;
    if(!data){
        return res.status(400).send("please enter some data in params ")
    }
    if(!isValidObjId(data)){
        return res.status(400).send("please enter valid book id")
    }
    const findBookId=await bookmodel.findOne({_id:data,isDeleted:false});  
    
    
    if(!findBookId){
        return res.status(400).send("book id not found");

    }
    return res.status(200).send({status:true,msg:findBookId})
    } catch (error) {
        return res.status(500).send({status:false,msg:error.message}) 
    }
}

const updateBooks=async (req,res)=>{
    try {
        const bookId=req.params.bookId
        const data=req.body;
        if(!isValidObjId(bookId)){
            return res.status(400).send("please enter valid object id")
        }
        if(data.title){
            const findTitle=await bookModel.findOne({title:data.title})
            if(findTitle){
                return res.status(400).send("Title already exist");
            }

        }
        // console.log(findTitle)
        if(data.excerpt){
            const findExcerpt=await bookModel.find({excerpt:data.excerpt})
            if(findExcerpt){
                return res.status(400).send("excerpt already exist");
            }
            
        }
        if(data.ISBN){
            const findISBN=await bookModel.find({ISBN:data.ISBN})
            if(findISBN.length>0){
                return res.status(400).send("ISBN already exist");
            }
            
        }
        // if(data.title){
        //     const findTitle=await bookModel.find({title:data.title})
        //     if(findTitle){
        //         return res.status(400).send("Title already exist");
        //     }
            
        // }
        const dataRes=await bookModel.findByIdAndUpdate(bookId,data,{new:true})
        if(!dataRes){
            return res.status(400).send("id Not found ")
        }
        return res.status(200).send({status:true,msg:dataRes})

        
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

const deleteBookById=async (req,res)=>{
    try {
        const bookId=req.params.bookId
        const findBookId=await bookModel.findOne({_id:bookId})
        if(!isValidObjId(bookId)){
            return res.status(400).send("please enter valid object id");
        }
        if(!findBookId){
            return res.status(400).send("bookId not found please try again");
        }
        const update=await bookModel.findOne({_id:bookId,isDeleted:false})
        if(!update){
            return res.status(400).send("book is already deleted ")
        }
        const updateRes=await bookModel.findByIdAndUpdate(bookId,isDeleted=true,{new:true})
        return res.status(201).send({
            status:"book deleted succesfully",msg:updateRes
        })


        
    } catch (error) {
        return res.status(500).send(error.message)
    }
}


module.exports.createBook=createBook
module.exports.getBooks=getBooks
module.exports.getBooksById=getBooksById
module.exports.updateBooks=updateBooks
module.exports.deleteBookById=deleteBookById


