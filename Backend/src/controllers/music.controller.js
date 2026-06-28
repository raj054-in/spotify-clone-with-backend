const musicModel = require("../models/music.model");
const albumModel = require("../models/album.model");
const  jwt =require('jsonwebtoken');
const uploadImage = require("../services/storage.service");

async function createMusic(req,res){
    try {
        
        const {title}=req.body
        const file=req.files
       
         if (!file||!file['music'][0]||!file['image'][0]) {
            return res.status(400).json({
                message:"Add Music and Music Image"
            }) 
        }
        
        const uploadResponseMusic=await uploadImage(file['music'][0])
        const uploadResponseImage=await uploadImage(file['image'][0])
        const  music=await musicModel.create({
            image:uploadResponseImage.url,
            uri:uploadResponseMusic.url,
            title,
            artist:req.user.id
        })
        res.status(201).json({
            message:"Music added sucessfully",
            music
        })
    } catch (error) {
        return res.status(500).json({
            message:error.message
        }
        )
        
    }
   
}
async function createAlbum(req,res){
    try {
        const  {title,musicIds}=req.body
        const file = req.file
        const imageUploadResponse = await uploadImage(file)
        
        const album=await albumModel.create({
            image:imageUploadResponse,
            title ,
            musics:musicIds,
            artist:req.user.id
        
        })
        res.status(201).json({
            message:"Music added sucessfully",
            album
        })
        
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
        
    }
}
async function getAllMusic(req,res) {
    try {
        const music=await musicModel.find().limit(20)
        res.status(200).json({
            message:"All the music are fetched sucessfully",
            music
        })   
        
    } catch (error) {
        res.status(500).json({
            message:"Failed To Fetch the Musics",
            error:error
        })
        
    }
}
async function getArtistsMusic(req,res) {
    try {
        const music = await musicModel.find({artist:req.user.id})

        res.status(200).json({
        message:"All the music are fetched sucessfully",
        music
    }) 
        
    } catch (error) {
         res.status(500).json({
            message:"Failed to fetch the Artists Music",
            error:error
        })
        
        
    }
    
}
async function getAllAlbum(req,res) {
    const album=   await albumModel.find().limit(20)
    .limit(10)
    .select('title artist')
    .populate('artist','username email')

        res.status(200).json({
        message:"Albums fetched sucessfully"  ,
        album
    })
    
}
async function getAlbumMusic(req,res) {
    const albumID=req.params.albumID
    const music =await albumModel.findById(albumID).populate('musics') .populate('artist','username email').limit(20)
    res.status(200).json({
        message:"Album Music has been fetched sucessfully",
        music
    })


}


module.exports={createMusic,createAlbum,getAllMusic,getAllAlbum,getAlbumMusic,getArtistsMusic}