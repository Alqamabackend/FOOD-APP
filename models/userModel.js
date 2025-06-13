const mongoose = require ("mongoose")

//schema 
const userSchema = new  mongoose.Schema ({
    userName:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique: true
    },
    password:{ 
        type: String,
        unique:true,
        required:true,
     },
     address:{
        type:Array,

     },
     phone:{
        type:String,
        required:true
     },
     usertype:{
        type:String,
      //   required:true,
     },
     answer :{
         type:String,
         required:[true , "Answer is required"]
     }

},{timestamps: true})

module.exports = mongoose.model("User", userSchema)