const Post = require("../models/postModel");


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

exports.getPosts = async (req,res) => {
    try{
        const post = await Post.find();
                    // .populates("likes").populates("comments").exec();
        res.status(200).json({
            success:true,
            data: post,
            message:"Fetched Post successfully"
        })  
    }
    catch(err){
        res.status(500).json({
            success: false,
            message:"Error in fetching Post",
        })
    }
}

