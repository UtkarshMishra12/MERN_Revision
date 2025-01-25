const express = require("express");
const router = express.Router();


const {createComment} = require("../controller/commentController");
const {createPost} = require("../controller/PostController");

//Mapping Controller
router.post("/comments/create", createComment);
router.post("/post.create", createPost);

//export
module.exports = router;