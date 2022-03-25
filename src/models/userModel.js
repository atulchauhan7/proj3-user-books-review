const {default :mongoose}=require('mongoose')

const userSchema=new mongoose.Schema({
    title: {
        type:String,
        require:true,
        enum:['Mr', 'Mrs', 'Miss']
    },
  name: {
      type:String,
      require:true
  },
  //{string, mandatory},
  phone: {
      unique:true,
      type:String,
      require:true
  },
  email: {
      type:String,
      require:true,
      unique:true,
      match: [/^\w+([\.-]?\w+)@\w+([\. -]?\w+)(\.\w{2,3})+$/, 'Please fill a valid email address']

  },
  password: {
      type:String,
      require:true,
      minLength:8,
      maxLength:15

  },
  //{string, mandatory, minLen 8, maxLen 15},
  address: {
    street: {type:String,trim:true},
    city: {type:String,trim:true},
    pincode: {type:String,trim:true}
  },
},{timestamps:true})

module.exports=mongoose.model('user',userSchema)