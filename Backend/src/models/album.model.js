const mongoose=require('mongoose')
const albumSchemma=new mongoose.Schema({
    image:{
        type:String,
        require:true
    },
    title:{
        type:String,
        require:true
    },
    musics:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'music',
        require:true
    }],
    artist:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        require:true
    }
})
const albumModel=mongoose.model("album",albumSchemma)
module.exports=albumModel