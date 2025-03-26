const express = require("express");
const router = express.Router();


const {createComment} = require("../controller/commentController");
const {createPost, getPosts} = require("../controller/PostController");
const {likePost, unlikePost} = require("../controller/LikeController");

//Mapping Controller
router.post("/comments/create", createComment);
router.post("/posts/create", createPost);
router.get("/posts", getPosts);
router.post("/likes/like", likePost);
router.post("/likes/unlike", unlikePost);

//export
module.exports = router;