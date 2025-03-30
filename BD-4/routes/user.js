const express = require('express');
const router = express.Router();
const User = require("../model/User");

const { signUp, signIn } = require("../controller/Auth");
const {auth, isStudent, isAdmin } = require("../middleware/auth")

router.post("/signup", signUp);
router.post("/signin", signIn);

//Protected routes
router.get("/student", auth, isStudent, (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to protected route for student",
  });
});

router.get("/admin", auth, isAdmin, (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to protected route for admin",
  });
});

router.get("/test", auth, (req, res) => {
    res.status(200).json({
        success: true,
        message: "Welcome to protected route for test",
    });
});

router.get("/getEmail", auth, async(req, res) => {
    try{
        const id = req.user.id;
        const data = await User.findById(id);
        res.status(200).json({
            success: true,
            data: data,
            message: "Welcome to protected route for getEmail",
        });
    }
    catch(error){
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
});

module.exports = router;
