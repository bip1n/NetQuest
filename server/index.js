
require('dotenv').config()
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(express.json())  

app.use(cors());



app.use("/api", require("./app/routers/authRouter"));

app.get("/", (req, res) => {
  res.send("Hi Welcome to MERN TEST API .....");
});

// Connecting to MongoDB using Mongoose
mongoose.connect(process.env.mongoDBURL, { })
  .then(() => { 
    console.log('MongoDB Connected');
    app.listen(port, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  })
  .catch(err => {
    console.error('Database connection error:', err);
  });
