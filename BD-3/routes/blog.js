const express = require("express");
const router = express.Router();


//Import Controller
const {dummy} = require("../controller/commentController");

//Mapping Controller
router.get("/dummy", dummy);

//export
module.exports = router;