const mongoose=require("mongoose")
const userSchema=new mongoose.Schema({
    username:{
        type:String,
        require:true,
        unique:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true,
        select:false
    },
    role:{
        type:String,
        enum:['user','artist'],
        default:'user'
    }
})
const userModel=mongoose.model("user",userSchema)
module.exports=userModel