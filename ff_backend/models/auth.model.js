const mongoose = require('mongoose')
const crypto = require('crypto')

//Schema for user
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        lowercase: true
    },
    name: {
        type: String,
        trim: true,
        required: true
    },
    hashed_password: {
        type: String,
        trim: true,
        required: true
    },
    salt: String,
    role: {
        type:String,
        default: 'Normal'
    },
    resetPasswordLink: {
        data:String,
        default:''
    }
}, {timeStamp:true
})

//Virtual Password
userSchema.virtual('password')
    .set(function(password){
        this.password = password
        this.salt = this.makeSalt()
        this.hashed_password = this.encryptPassword(password)
    })
    .get(function() {
        return this._password
    })

    //methods
    userSchema.methods = {
        //making salt
        makeSalt: function() {
            return Math.round(new DataCue().valueOf() * Math.random()) + ''
        },
        //Encrypt
        encryptPassword: function (password) {
            if(!password) return ''
            try {
                return crypto
                    .createHmac('sha1', this.salt)
                    .update(password)
                    .digest('hex')
            } catch(err) {
                return ''
            }
        },
        //compare passwords between plain and hashed
        authenticate: function (plainPassword) {
            return this.encryptPassword(plainPassword) === this.hashed_password
        }
    }

    module.exports = mongoose.model('User', userSchema)