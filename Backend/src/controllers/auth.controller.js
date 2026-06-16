const userModel = require("../models/user.model");
const jwt=require('jsonwebtoken')
const bcrypt =require('bcryptjs')

async function  registerUser(req,res) {
    let {username,email,password,role='user'}=req.body
    if (!username||!email|| !password) {
        return res.status(400).json({
            message:"Fill all the credentials"
        })
    }
    const emailRegex = /^(?!\.)(?!.*\.\.)([a-z0-9_'+\-\.]*)[a-z0-9_+\-]@([a-z0-9][a-z0-9\-]*\.)+[a-z]{2,}$/i;
    if (!emailRegex.test(email)) {
        return res.status(400).json({
            message:"email format didn't matched"
        })
    }
    role=role||"user"
   
   
    const hash = await bcrypt.hash(password, 10)
    
    const isUserAlreadyExists=await userModel.findOne({
        $or:[
            {username},
            {email}
        ]
    })
    if (isUserAlreadyExists) {
        return res.status(409).json({
            message:'The user with following credentials already exists'
        })
        
    }
    try {
      const user=await userModel.create({
        username,email,password:hash,role
      })
    
      const token =jwt.sign({id:user._id,role:user.role},process.env.JWT_SECRET,{expiresIn:'1d'})
      res.cookie("token",token)
      res.status(201).json({
        message:"Registered sucessfully",
        user,token})

    } catch (error) {
        console.log(error)
        res.status(500).json({message:error.message})
    }
    
}


async function loginUser(req,res){
    const {email,password}=req.body
    if (!email ||!password) {
        return res.status(400).json({
            message:"Fill all the Credentials"
        })
    }
    try {
        const user=await userModel.findOne({
            email
        }).select('+password')
       
        if(!user){
            return res.status(401).json({message:"Invalid Credentials"})
        }
        const isPasswordValid=await bcrypt.compare(password,user.password)
        if(!isPasswordValid){
            return res.status(401).json({message:"The password you have given is incorrect "})
        }
        const token=jwt.sign({id:user._id,role:user.role},process.env.JWT_SECRET,{expiresIn:'1d'})
    res.cookie('token',token)
    res.status(200).json({
        message:"User logged In sucessfully ",
        user,token
    })
    
} catch (error) {
    console.log(error)
    res.status(500).json({
        message:error.message
    })
    
}
}
async function logoutUser(req,res) {
    res.clearCookie('token')
    res.status(200).json({
        message:"User logged out sucessfully"
    }) 
}
async function getProfile(req,res) {
    try {
        res.status(200).json({
            message:"User Fetched sucessfully",
            user:req.user
        })
        
    } catch (error) {
        res.status(500).json({
            message:"Internal server error"
        }

        )
        
    }
    
}
module.exports={registerUser,loginUser,logoutUser,getProfile}