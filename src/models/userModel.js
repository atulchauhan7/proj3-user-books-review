const {default :mongoose}=require('mongoose')

const userSchema=new mongoose.Schema({
    title: {
        type:String,
        required:true,
        enum:['Mr', 'Mrs', 'Miss']
    },
  name: {
      type:String,
      required:true
  },
  //{string, mandatory},
  phone: {
      unique:true,
      type:String,
      required:true,
      trim:true
  },
  email: {
      type:String,
      required:true,
      unique:true,
    //   match: [/^\w+([\.-]?\w+)@\w+([\. -]?\w+)(\.\w{2,3})+$/, 'Please fill a valid email address'],
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address' ],
      trim:true,
      lowercase:true

  },
  password: {
      type:String,
      required:true,
      minLength:[8,'min length should be 8'],
      maxLength:[15,'max length should be 15']

  },
  //{string, mandatory, minLen 8, maxLen 15},
  address: {
    street: {type:String,trim:true},
    city: {type:String,trim:true},
    pincode: {type:String,trim:true,minLength:[6,'min length should be 6'],maxLength:[6,'max length should be 6']}
    // pincode:{type:String,trim :true}
  },
},{timestamps:true})

module.exports=mongoose.model('user',userSchema)  