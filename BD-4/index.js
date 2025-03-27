const express = require('express');
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 3000;  

app.use(express.json());

const userRouter = require("./routes/user");
app.use("/api/v1", userRouter);

const dbConnect = require("./config/database");
dbConnect();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get("/", (req, res) => {
  res.send("Welcome to the Home Page");
});