const Todo = require("../models/Todo");

exports.deleteTodo = async(req,res) =>{
    try{
        const id = req.params.id;
        await Todo.findByIdAndDelete(
            {_id:id}
        );
        res.status(200).json({
            success:true,
            message:"Todo deleted successfully",
        });
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