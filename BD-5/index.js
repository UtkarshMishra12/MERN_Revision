const express = require('express');
const app = express();

require('dotenv').config();
const PORT = process.env.PORT || 3000;

app.use(express.json());
const fileupload = require("express-fileupload");
app.use(fileupload({
    useTempFiles: true,
    tempFileDir: '/tmp/',
}));

const dbConnect = require('./config/database');
dbConnect();

const cloudinaryConnect = require('./config/cloudinary');
cloudinaryConnect();

const Upload = require('./routes/FileUpload');
app.use("/api/v1/upload", Upload);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.get('/', (req, res) => {
    res.send('Hello World!');
});