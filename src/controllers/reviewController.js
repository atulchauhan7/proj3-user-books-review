const reviewModel=require('../models/reviewModel');
const bookModel=require('../models/bookmodel');
const userModel=require('../models/userModel');
const mongoose=require('mongoose');
const bookmodel = require('../models/bookmodel');

const isValid =function (value){
    if(typeof value==='undefined'||typeof value==null) return false
    if(typeof value ===String||value.trim().length===0) return false
    return true
}
const isValidObjId=function(userId){
    return mongoose.Types.ObjectId.isValid(userId)
}
const createReview=async (req,res)=>{
    try {
        const bookId=req.params.bookId
        const data =req.body;
        if(!data){
            return res.status(400).send("please enter some data ")
        }
        if(!isValidObjId(bookId)){
            return res.status(400).send("please provide book id ") 
        }
        if(!isValid(data.reviewedBy)){
            return res.status(400).send("please provide reviewed by")
        }
        if(!data.rating){
            return res.status(400).send("please provide book rating ")
        }
        if(data.rating>5||data.rating<0){
            return res.status(400).send("min length of rating should be 0 , max length should be 5")
        }
        const findBookId=await bookmodel.findOne({_id:bookId,isDeleted:false})
        if(!findBookId){
            return res.status(400).send("book Id dosen't exists")
        }

        const dataRes=await reviewModel.create(data)
        return res.status(201).send({status:true,msg:dataRes})
    } catch (error) {
        return res.status(500).send(error.message)
    }
}
const updateReviewById=async (req,res)=>{
    try {
        const bookId=req.params.bookId
        const reviewId=req.params.reviewId
        const data=req.body
        let obj={}
        if((!isValidObjId(reviewId))||(!isValidObjId(bookId))){
            return res.status(400).send("please enter valid object id's")
        }

        if(data.review){
            obj.review=data.review
        }
        if(typeof(data.rating)!=Number){
            return res.status(400).send("type of rating should be in number ")
        }
        if(data.rating>5||data.rating<0){
            return res.status(400).send("min length of rating should be 0 , max length should be 5")
        }
        if(data.reviewedBy){
            obj.reviewedBy=data.reviewedBy
        }
        // if(data.rating){
        //     obj.rating=data.rating 
        // }
        const findReview=await reviewModel.findByIdAndUpdate(reviewId,obj,{new:true})
        if(!findReview){
            return res.status(400).send({status:false,msg:"no review exits here"})
        }
        return res.status(200).send({status:"review updated successfully",msg:findReview})
    } catch (error) {
        return res.status(500).send({status : false , msg :error.message})
    }
}

const deleteReviewById=async function(req,res){
    try {
        const bookId=req.params.bookId
        const reviewId=req.params.reviewId
        if(!isValidObjId(reviewId)){
            return res.status(400).send("Please enter a valid reviewId Id")
        }
        if(!isValidObjId(bookId)){
            return res.status(400).send("Please enter a valid book Id")
        }  
        const findReview=await reviewModel.findByIdAndUpdate({_id:reviewId},{$set:{isDeleted:true}},{new:true})
        if(!findReview.length<0){
            return res.status(400).send("review not found please try again after some time ")
        } 
        return res.status(200).send({status:"book deleted successfully ",msg:findReview})
        
    } catch (error) {
        return res.status(500).send(error.message)       
    }  
}

module.exports.createReview=createReview
module.exports.updateReviewById=updateReviewById
module.exports.deleteReviewById=deleteReviewById 
