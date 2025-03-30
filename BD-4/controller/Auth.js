const mongoose = require("mongoose");
const User = require("../model/User");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

const bcrypt = require("bcrypt");

const signUp = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const userExist = await User.findOne({ email });

    if (userExist) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(password, 10);
    } catch (error) {
      return res.status(400).json({
        message: error.message,
      });
    }

    const user = new User({
      name,
      email,
      password: hashedPassword,
      role,
    });

    await user.save();

    return res.status(201).json({
      message: "User created successfully",
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please enter email and password",
      });
    }

    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User does not exist",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    const payload = {
      id: user._id,
      email: user.email,
      role: user.role,
    };

    if (isMatch) {
      let token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "2h",
      });

      user = user.toObject(); // Convert Mongoose document to plain object
      user.token = token;
      user.password = undefined;

      const options ={
        exppires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3Days
        httpOnly: true,
      }

      res.cookie("token", token, options).status(200).json({
        success: true,
        message: "User signed in successfully",
        token,
        user,
      });

    } 
    else {
      return res.status(400).json({
        message: "Invalid password",
      });
    }

  } catch (error) {
    return res.status(500).json({
      success:false,
      message: "Error in Singin",
      error: error.message,
    });
  }
}; 

module.exports = { signUp, signIn };
