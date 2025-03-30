//auth 
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();

exports.auth = async (req, res, next) => {
    try{

        console.log("cookie", req.cookies.token);
        console.log("header", req.header("Authorization"));
        console.log("body", req.body.token);

        const token = req.body.token || req.header("Authorization").replace("Bearer", "") || req.cookies.token;
        if(!token || token === "null") {
            return res.status(401).json({
                success: false,
                message: "Please login first | Token not found",
            });
        }
        
        try{
            const payload = jwt.verify(token, process.env.JWT_SECRET);
            req.user = payload;
            console.log("Payload: ", payload);
        }
        catch (error) {
            return res.status(401).json({
                success: false,
                message: "Invalid token",
            });
        }

        next(); 
    } 
    
    catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid token for authentication",
        });
    }
}


exports.isStudent = async (req, res, next) => {
    try{
        if(req.user.role !== "Student") {
            return res.status(401).json({
                success: false,
                message: "You are not authorized to access the student route",
            });
        }
        next();
    }
    catch (error) {
        return res.status(401).json({
            success: false,
            message: "User role is not matching",
        });
    }
}

exports.isAdmin = async (req, res, next) => {
    try{
        if(req.user.role !== "Admin") {
            return res.status(401).json({
                success: false,
                message: "You are not authorized to access the admin route",
            });
        }
        next();
    }
    catch (error) {
        return res.status(401).json({
            success: false,
            message: "User role is not matching",
        });
    }
}
