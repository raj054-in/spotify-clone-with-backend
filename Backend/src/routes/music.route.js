const route=require('express').Router()
const musicController=require('../controllers/music.controller')

const multer=require("multer")
const authMiddlewear = require('../middleware/auth.middleware')
const upload=multer({
    storage:multer.memoryStorage()
})




route.post("/upload",authMiddlewear.authArtist, upload.fields([{name:"music",maxCount:1},{name:"image",maxCount:1}]) ,musicController.createMusic)                                 
route.post("/create-album", upload.single('image')  ,authMiddlewear.authArtist,musicController.createAlbum)
route.get('/',authMiddlewear.authUser,musicController.getAllMusic)
route.get('/album',authMiddlewear.authUser,musicController.getAllAlbum)
route.get('/album/:albumID',authMiddlewear.authUser,musicController.getAlbumMusic)
module.exports=route
