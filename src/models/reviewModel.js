const mongoose =require("mongoose");
const ObjectId=mongoose.Schema.Types.ObjectId

const reviewSchema=new mongoose.Schema({
  bookId: {type:ObjectId, required:true, ref:'book'},
  reviewedBy: {type:String, required:true, default :"Guest", value: {type:String}},
  reviewedAt: {type:Date, required:true,new:true,format:("YYYY-MM-DD")},
  rating: {type:Number, minLength:[1,"min length should be 1"], minLength:[1,"max length should be 5"], required:true},
  review: {type:String},
  isDeleted: {type:Boolean, default: false},
  
},{timestamps:true})

module.exports=mongoose.model('reviews',reviewSchema)