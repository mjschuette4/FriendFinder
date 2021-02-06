const express = require('express');
const cors = require('cors');

//Allows the use of our dotenv file
require('dotenv').config();

//Sets up our port
const app = express();
const port = process.env.PORT || 5000;

//middleware and allow us to parse json
app.use(cors());
app.use(express.json());

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});