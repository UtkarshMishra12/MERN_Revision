const Like = require("../models/likeModel");
const Post = require("../models/postModel");

exports.likePost = async (req,res) =>{
    try{
        const {post,user} = req.body;
        const like = new Like({
            post,user,
        });

        const savedLiked = await like.save();

        //update the post collection
        const updatedPost = await Post.findByIdAndUpdate(post, {$push: {likes: savedLiked._id}}, {new:true} ).populate("likes").exec();

        res.status(200).json({
            success:true,
            data: updatedPost,
            message:"Liked successfully"
        })  
    }
    catch(err){
        res.status(500).json({
            success: false,
            message:"Error in Liking Post",
        })
    }
}

exports.unlikePost = async(req, res)=>{
    try{
        const {post, like} = req.body;
        //find and delete the like collection DB
        const deletedLike= await Like.findOneAndDelete({post: post, _id:like });

        //update the post collection DB
        const updatedPost = await Post.findByIdAndUpdate(post, {$pull : { likes : deletedLike._id}}, {new:true})
        .populate("likes").exec();

        res.json({
           post:updatedPost,
        });
    }
    catch(error){
        return res.status(404).json({
            error:" Error while creating post",
        });
    }
}