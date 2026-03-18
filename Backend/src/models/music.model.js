const mongoose=require("mongoose")
const musicSchemma=new mongoose.Schema({
    uri:{
        type:String,
        require:true
    },
    title:{
        type:String,
        require:true
    },
    artist:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        require:true
// type: mongoose.Schema.Types.ObjectId: This tells Mongoose that the postedBy field will store a unique MongoDB document ID (an ObjectId), not a normal string or number.
// ref: 'User': This is the crucial part. It tells Mongoose: "The ID stored in this field belongs to a document in the User collection." ### 2. The Query (populate)

    }   

})
const musicModel=mongoose.model("music",musicSchemma)
module.exports=musicModel