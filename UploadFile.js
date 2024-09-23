import express from "express";
import { upload } from './multer.js';
import { uploadOnCloudinary } from './cloudinary.js';
import fs from "fs";


export const fileUpload =  express.Router();

fileUpload.post('/upload',upload.single('file'),async(req,res)=>
  {
    try {
      if(!req.file){
        return res.status(404).send ({
          message:"File not found"
        })
      }
    
      const localPath = req.file.path;
    
      const cloudinaryResp = await uploadOnCloudinary(localPath);
    
      fs.unlinkSync(localPath);
    
      return res.status(200).json({
        code:200,
        message:"File uploaded to cloudinary successfully",
        url: cloudinaryResp.url
      })
    } catch (error) {
      return res.status(500).json({message:"Fail to upload file",error:error.message})
    }
  
  })