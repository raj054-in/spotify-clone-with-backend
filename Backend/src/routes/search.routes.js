const route = require("express").Router()
const serachController=require("../controllers/search.controller")
const authMiddlewear=require('../middleware/auth.middleware')

route.get('/',authMiddlewear.authUser,serachController.SearchMusicAndAlbum)

module.exports=route