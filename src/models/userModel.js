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
      require:true,
      trim:true
  },
  email: {
      type:String,
      require:true,
      unique:true,
      match: [/^\w+([\.-]?\w+)@\w+([\. -]?\w+)(\.\w{2,3})+$/, 'Please fill a valid email address'],
      trim:true,
      lowercase:true

  },
  password: {
      type:String,
      require:true,
      minLength:[8,'min length should be 8'],
      maxLength:[15,'max length should be 15']

  },
  //{string, mandatory, minLen 8, maxLen 15},
  address: {
    street: {type:String,trim:true},
    city: {type:String,trim:true},
    pincode: {type:String,trim:true,minLength:[6,'min length should be 6'],maxLength:[6,'max length should be 6']}
  },
},{timestamps:true})

module.exports=mongoose.model('user',userSchema)