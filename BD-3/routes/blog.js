const express = require("express");
const router = express.Router();


const {createComment} = require("../controller/commentController");
const {createPost, getPosts} = require("../controller/PostController");

//Mapping Controller
router.post("/comments/create", createComment);
router.post("/posts/create", createPost);
router.get("/posts", getPosts);

//export
module.exports = router;