const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');

//Allows the use of our dotenv file
require('dotenv').config({
    path: './config/config.env'
});

//Sets up our port
const app = express();
const PORT = process.env.PORT;

//middleware and allow us to parse json
app.use(cors());
app.use(express.json());


app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});