const ImageKit=require("imagekit")
const imageKitClient=new ImageKit({
    privateKey:process.env.IMAGEKIT_PRIVATE_KEY,
    publicKey:process.env.IMAGEKIT_PUBLIC_KEY,
    urlEndpoint:process.env.URL_ENDPOINT
})
async function uploadImage(file){
    const uploadFileResponse = await imageKitClient.upload({
        file: file.buffer.toString('base64'),
        fileName: file.originalname,
        folder:"spotify-clone"
    })
    return uploadFileResponse
}
module.exports=uploadImage