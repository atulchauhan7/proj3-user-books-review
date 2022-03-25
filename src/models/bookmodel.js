const {default:mongoose}=require('mongoose')

const bookModel=new mongoose.Schema({
  title:{
      type:String,
      require:true,
      unique:true

  } ,
  excerpt: {type:String, require:true}, 
  userId: {type:ObjectId, require:true,ref:'user'},
  ISBN: {type:true, require:true, unique:true},
  category: {type:String, require:true},
  subcategory: {type:String, require:true},
  reviews: {type:Number, default: 0, comment: 'Holds number of reviews of this book'},
  deletedAt: (Date.now()), 
  isDeleted: {type:Boolean, default: false},
  releasedAt: {Date.now(), require:true, new Date(YYYY-MM-DD)},
  
},{timestamps:true})