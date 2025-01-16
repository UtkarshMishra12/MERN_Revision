const express = require('express');
const app = express();


const bodyParser = require('body-parser');

app.listen(3000, () =>{
    console.log("Server started");
});
app.use(bodyParser.json());
app.get('/', (request,response) =>{
    response.send("Hello ji");
})

app.post('/api/cars', (request,response)=>{
    const {name,brand} = request.body;
    console.log(name);
    console.log(brand);
    response.send("Cars submitted");
})

const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/Carssssssss', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("Connection Established to MongoDB"))
.catch((error) => console.log("Received an error", error.message))