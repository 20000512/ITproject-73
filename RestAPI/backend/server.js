const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
//const helmet = require("helmet");
//const morgan = require("morgan");
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const port = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

const uri = process.env.URI;

mongoose.connect(uri);

const connection = mongoose.connection;
connection.once('open',() => {console.log("Mongodb database connection established successfully")});

const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});