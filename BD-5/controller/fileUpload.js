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