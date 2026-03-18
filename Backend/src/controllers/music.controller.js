const musicModel = require("../models/music.model");
const albumModel = require("../models/album.model");
const  jwt =require('jsonwebtoken');
const uploadImage = require("../services/storage.service");

async function createMusic(req,res){
    const {title}=req.body
    const file=req.file
    
    const uploadResponse=await uploadImage(file)
    const  music=await musicModel.create({
        uri:uploadResponse.url,
        title,
        artist:req.user.id
    })
    res.status(201).json({
        message:"Music added sucessfully",
        music
    })
}
async function createAlbum(req,res){
    const  {title,musicIds}=req.body
    
    const album=await albumModel.create({
        title ,
        musics:musicIds,
        artist:req.user.id
    
    })
    res.status(201).json({
        message:"Music added sucessfully",
        album
    })
}
async function getAllMusic(req,res) {
    const music=await musicModel.find().limit(20)
    res.status(200).json({
        message:"All the music are fetched sucessfully",
        music
    })
    
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

module.exports={createMusic,createAlbum,getAllMusic,getAllAlbum,getAlbumMusic}