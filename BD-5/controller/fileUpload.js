const mongoose = require("mongoose");  
const File = require("../models/File");
const cloudinary = require("cloudinary").v2;

exports.localFileUpload = async (req, res) => {
    try{
        const file = req.files.file;
        console.log(file);

        let path = __dirname + "/files/" + Date.now() + `.${file.name.split(".")[1]}`;
        console.log(path);

        file.mv(path, (err)=>{
            console.log(err);
        })

        res.status(200).json({
            message: "File Uploaded Successfully",
            success: true,
        });

    }
    catch(error){
        console.log(error);
        res.status(500).json({message: "Internal Server Error"});
    }
}

function isFileFormatSupported(fileFormat, supportedFormats) {
    return supportedFormats.includes(fileFormat);
}

async function uploadFileToCloudinary(file, folder, quality){
    const options = {folder};
    if(quality){
        options.quality = quality;
    }
    options.resource_type = "auto";
    return await cloudinary.uploader.upload(file.tempFilePath, options);
}

exports.imageUpload = async (req,res) =>{
    try{
       const {name, email, tags} = req.body;
       console.log(name,tags,email);

       const file = req.files.imageFile;
       console.log(file);

       const supportedFormats = ["jpg", "jpeg", "png", "gif"];
       const fileFormat = file.name.split(".")[1].toLowerCase();

       if(!isFileFormatSupported(fileFormat, supportedFormats)){
        return res.status(400).json({
            message: "Unsupported file format",
            success: false,
        });
        }

        //file format supported
        const response = await uploadFileToCloudinary(file, "Mishra_Utkarsh_April");
        console.log(response);
        //save to db
        const fileData = await File.create({
            name,
            email,
            tags,
            imageUrl: response.secure_url,
        });
        
        res.status(200).json({
            message: "File Uploaded Successfully",
            success: true,
            imageUrl: response.secure_url,
        });

    }
    catch(error){
        console.log(error);
        res.status(500).json({message: "Internal Server Error while uploading image"});
    }
}

exports.videoUpload = async (req,res) =>{
    try{
        const {name,email, tags}= req.body;
        console.log(name,tags,email);

        const file=  req.files.videoFile;
        console.log(file);

        const supportedFormats = ["mp4", "mov"];
        const fileFormat = file.name.split(".")[1].toLowerCase();

        if(!isFileFormatSupported(fileFormat, supportedFormats)){
            return res.status(400).json({
                message: "Unsupported file format",
                success: false,
            });
        }

        //file format supported
        const response = await uploadFileToCloudinary(file, "Mishra_Utkarsh_April");
        console.log(response);

        //save to db
        const fileData = await File.create({
            name,
            email,
            tags,
            imageUrl: response.secure_url,
        });

        res.status(200).json({
            message: "File Uploaded Successfully",
            success: true,
            videoUrl: response.secure_url,
        });
    }
    catch(error){
        console.log(error);
        res.status(500).json({message: "Internal Server Error while uploading video"});
    }
}

exports.imageReducerUpload = async(req,res)=>{
    try{
        const {name,tag,email} = req.body;
        console.log(name,tag,email);

        const file = req.files.imageFile;
        console.log(file);

        const supportedFormats = ["jpg", "jpeg", "png", "gif"];
        const fileFormat = file.name.split(".")[1].toLowerCase();
       
        if(!isFileFormatSupported(fileFormat, supportedFormats)){
            return res.status(400).json({
                message: "Unsupported file format",
                success: false,
            });
        }
        //file format supported 
        const response = await uploadFileToCloudinary(file, "Mishra_Utkarsh_April", 30);
        console.log(response);
        //save to db
        const fileData = await File.create({
            name,
            email,
            tags: tag,
            imageUrl: response.secure_url,
        });
        

        res.status(200).json({
            message: "File Uploaded Successfully",
            success: true,
            imageUrl: response.secure_url,
        });


    }
    catch(error){
        console.log(error);
        res.status(500).json({message: "Internal Server Error while uploading image with reduced size"});
    }
}