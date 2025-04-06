const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
require("dotenv").config();

const fileSchema = new mongoose.Schema(
    {
    name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
    },
    tags:{
        type: String,
    },
    imageUrl:{
        type: String,
    }
});

//post nodemailer
fileSchema.post("save", async function (doc) {
    try{
        console.log("File saved successfully:", doc);

        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            },
        });

        //send mail
        let info =await transporter.sendMail({
            from: `Utkarsh Mishra`,
            to: doc.email,
            subject: "File Upload Confirmation",
            text: ` <h1> Hello from Utkarsh </h1> Your file ${doc.name} has been uploaded successfully.`,
        });

        console.log(info);
    }
    catch(err){
        console.log(err);
    }
})

module.exports = mongoose.model("File", fileSchema);