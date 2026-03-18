const authController= require('../controllers/auth.controller')

const route=require('express').Router()

route.post("/register",authController.registerUser)
route.post('/login',authController.loginUser)
route.post('/logout',authController.logoutUser)

module.exports=route