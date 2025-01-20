const Todo = require("../models/Todo");

exports.getTodo = async(req,res) =>{
    try{
        const todos = await Todo.find({});
        res.status(200).json({
            success:true,
            data:todos,
            message:"Entire Data Fetched0,"
        });
    }
    catch(err){
        console.log(err);
        console.error(err);
        res.status(500).json({
            success:false,
            data:"Internal Error",
            message:"Error in Server",
        });
    }
}


exports.getTodoById = async(req,res) =>{
    try{
        const id = req.params.id;
        const todo = await Todo.findById({
            _id:id
        });
        if(!todo){
            return res.status(400).json({
                success:false,
                message:"Id does not exist",
            });
        }
        res.status(200).json({
            success:true,
            data:todo,
            message:"Id fetched successfully",
        });
    }
    catch(err){
        console.log(err);
        console.error(err);
        res.status(500).json({
            success:false,
            data:"Internal Error",
            message:"Error in finding todo by using id",
        });
    }
}