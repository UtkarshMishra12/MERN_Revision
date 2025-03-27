const mongoose = require("mongoose");
require("dotenv").config();

const dbConnect = () =>{
    mongoose.connect( process.env.MONGODB_URL,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then( ()=> console.log("DB Connected Successfully"))
    .catch( (error) => {
        console.log("Error in DB Connection");
        console.error(error);
        process.exit(1);
    });
};

module.exports = dbConnect;