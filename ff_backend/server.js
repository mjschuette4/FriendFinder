const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./config/db')
const app = express();

//Allows the use of our dotenv file
require('dotenv').config({
    path: './config/config.env'
});

//connect to DB
connectDB();

app.use(bodyParser.json())

//Sets up our port

if(process.env.NODE_ENV === 'development') {
    app.use(cors({
        origin: process.env.CLIENT_URL
    }))

    app.use(morgan('dev'))
}

//Loading all routes
const authRouter = require('./routes/auth.route')

//Use Routes
app.use('/api', authRouter);


app.use( (req, res, next) => {
    res.status(404).json({
        success: false,
        message: "Page Not Found"
    })
});

const PORT = process.env.PORT;

//middleware and allow us to parse json
app.use(cors());
app.use(express.json());


app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});