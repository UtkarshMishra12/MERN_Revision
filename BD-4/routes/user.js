const express = require('express');
const router = express.Router();

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

module.exports = router;
