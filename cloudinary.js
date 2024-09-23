import { v2 as cloudinary } from 'cloudinary';
import fs from "fs";

cloudinary.config({
  cloud_name:process.env.CLOUDE_NAME,
  api_key:process.env.API_KEY,
  api_secret:process.env.API_SECRET
});

const uploadOnCloudinary = async(localFileUrl) => {

  try {
    //no such file located on url
    if(!localFileUrl) return null
    //upload file to cloudinary
    const response =await cloudinary.uploader.upload(localFileUrl,{
      resource_type:"auto",
    })
    console.log("File is uploaded on cloudinary",response.url);
    return response;
    
  } catch (error) {
    //if error to ramove file from local
    fs.unlinkSync(localFileUrl)
  }
};
export {uploadOnCloudinary};