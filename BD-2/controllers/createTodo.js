//import the model
const Todo = require("../models/Todo");

//define router handler

exports.createTodo = async(req, res) => {
    try{
        //extract title and description frpm request body
        const {title, description} = req.body;
        //create a new todo and insert it into db
        const response = await Todo.create({title, description});
        //send a json response with a success flag
        res.status(200).json(
            {
                success:true,
                data:response,
                message:'Entry Created Successully'
            }
        );
    }
    catch(err){
        console.log(err);
        console.error(err);
        res.status(500).json(
            {
                success:false,
                data:"Internal Server Error",
                message:err.message,
            }
        )
    }
}