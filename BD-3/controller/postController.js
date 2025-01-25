const Post = require("../models/postModel");
const Like = require("../models/likeModel");
const Comment = require("../models/commentModel");


exports.createPost = async (req,res) =>{
    try{
        const {title,body} = req.body;
        const post = new Post({
            title,body,
        });
        const savedPost = await post.save();
    
        res.status(200).json({
            success:true,
            data: savedPost,
            message:"Created Post successfully"
        })  
    }
    catch(err){
        res.status(500).json({
            success: false,
            message:"Error in creating Post",
        })
    }
}

