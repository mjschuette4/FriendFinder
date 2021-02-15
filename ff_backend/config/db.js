const mongoose = require('mongoose')

const connectDB = async() => {
    console.log(process.env.MONGO_URL)
    const connection = await mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: true,
        useUnifiedTopology: true
    })
    console.log(`MongoDB Connected: ${connection.connection.host}`);
};

module.exports = connectDB;