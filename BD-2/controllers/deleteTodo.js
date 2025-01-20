const Todo = require("../models/Todo");

exports.deletTodo = async(req,res) =>{
    try{

    }
    catch(err){
        console.log(err);
        console.error(err);
        res.status(500).json({
            success:false,
            data:"Internal Error",
            message:"Error in deleting the id",
        });
    }
}