const albumModel=require("../models/album.model")
const musicModel=require("../models/music.model")

async function SearchMusicAndAlbum(req,res) {
    try {
       
    
        const {q}=req.query
      
        if (!q||q.trim()=="") {
            return res.status(400).json({
                sucess:false,
                message:"Search query is Empty "
            })
        }
        const createSearchStage=(indexName)=>({
            $search:{
                index:indexName,
                autocomplete:{
                    query:q,
                    path:"title",
                    fuzzy:{}
                }
                
            }
        })
        const scoreProjection = {
            $addFields: {
                searchScore: { $meta: "searchScore" }
            }
        };

        const [musicResult,albumResult]=await Promise.all([
            musicModel.aggregate([
                createSearchStage("music_search_index"),
                scoreProjection,
                {$limit:10}

            ]),
            albumModel.aggregate([
                createSearchStage("albums_search_index"),
                scoreProjection,
                {$limit:10}
            ])
        ])

        const taggedMusic=musicResult.map(item=>({...item,type:"music"}))
        const taggedAlbum=albumResult.map(item=>({...item,type:"album"}))
        const combinedResults = [...taggedMusic, ...taggedAlbum]
            .sort((a, b) => b.searchScore - a.searchScore)
            .slice(0, 15); // Limit final output payload

        return res.status(200).json({
            success: true,
            count: combinedResults.length,
            data: combinedResults
        });


        
    } catch (error) {
        console.error("Atlas Search Error: ", error);
        return res.status(500).json({ success: false, message: "Internal server error during search" });
    }
        
    
    

    


    
}
module.exports={SearchMusicAndAlbum}