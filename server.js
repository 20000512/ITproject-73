const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
//const helmet = require("helmet");
//const morgan = require("morgan");

// Config environment variables
const dotenv = require('dotenv');
dotenv.config();

// Setup server
const app = express();
const port = process.env.PORT || 5003;

// Setup middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb' }));

// Connect to MongoDB Atlas
const uri = process.env.URI;
mongoose.connect(uri);

// Connection opened
const connection = mongoose.connection;
connection.once('open',() => {console.log("Mongodb database connection established successfully")});

// Declare routers
const recipesRouter = require('./routes/recipes');
const usersRouter = require('./routes/users');

// Use routers 
app.use('/recipes', recipesRouter);
app.use('/users', usersRouter);

// In production, serve index.html
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.resolve(__dirname, "frontend","build")));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
    });
}

// Open server
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});