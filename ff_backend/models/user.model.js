const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3,
    },
    password: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    fullname: {
        type: String,
        required: true,
        unique: false,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    location: {
        type: String,
        required: false
    },
    phone: {
        type: String,
        required: false
    }
}, {
    timestamps:true,
});

UserSchema.plugin(uniqueValidator, {
    message: 'is already taken.'
});

const User = mongoose.model('User', userSchema);

module.exports = User;