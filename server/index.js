require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();

app.use(bodyParser.json({ limit: '1000mb' }));
app.use(bodyParser.urlencoded({ limit: '1000mb', extended: true }));


// Enable CORS for all origins
app.use(cors());

// Middleware to parse JSON requests
app.use(express.json());



// Use the authRouter for authentication-related routes
app.use("/api", require("./app/routers/authRouter"));
app.use("/api", require("./app/routers/userRouter.js"));
app.use("/api", require("./app/routers/ownerRouter.js"));
app.use("/api", require("./app/routers/bothRouter.js"));
app.use("/api", require("./app/routers/adminRouter.js"));


app.get("/", (req, res) => {
  res.send("Hi Welcome to NET QUEST API .....");
});

// Connecting to MongoDB using Mongoose

mongoose.connect(process.env.mongoDBURL, {})
  .then(() => { 
    console.log('MongoDB Connected');
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  })
  .catch(err => {
    console.error('Database connection error:', err);
  });

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
