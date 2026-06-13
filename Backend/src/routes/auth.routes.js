const authController= require('../controllers/auth.controller')
const authMiddlewear=require('../middleware/auth.middleware')

const route=require('express').Router()

route.post("/register",authController.registerUser)
route.post('/login',authController.loginUser)
route.post('/logout',authController.logoutUser)
route.get('/get-profile',authMiddlewear.authUser,authController.getProfile)

module.exports=route