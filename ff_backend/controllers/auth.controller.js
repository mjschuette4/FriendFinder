const User = require('../models/auth.model')
const expressJwt = require('express-jwt')
const _ = require('lodash')
const { OAuth2Client } = require('google-auth-library')
const fetch = require('node-fetch')
const {validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')
const { errorHandler } = require('../helpers/dbErrorHandling') 
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.MAIL_KEY)

exports.registerController = (req, res) => {
    const { name, email, password } = req.body
    const errors = validationResult(req)

    if(!errors.isEmpty()) {
        const firstError = errors.array().map(error => error.msg)[0]
        return res.status(422).json({
            error: firstError
        })
    } else {
        User.findOne({
            email
        }).exec((err, user) => {
            //If the user exists
            if (user) {
                return res.status(400).json ({
                    error: "Email is taken"
                })
            }
        })
        //generate token
        const token = jwt.sign({
                name,
                email,
                password
            },
            process.env.JWT_ACCOUNT_ACTIVATION,{
                expiresIn: '15m'
            } 
        )

        const emailData = {
            to: email,
            from: process.env.EMAIL_FROM,
            subject: 'Account activation link',
            text: 'test 1,2,3',
            html: `
                <h1>Please Click the link to activate</h1>
                <p>${process.env.CLIENT_URL}/users/activate/${token}</p>
                <hr/>
                <p>This email contains sensitive information</p>
                <p>${process.env.CLIENT_URL}</p>
            `
        }

        sgMail.send(emailData).then(sent => {
            return res.json({
                message:`Email has been sent to ${email}`
            })
        }).catch(err =>{
            return res.status(400).json({
                error:err
            })
        })
    }
}

//activation and save to db
exports.activationController = (req, res) => {
    const {token} = req.body

    if (token) {
        //verify token is not expired
        jwt.verify(token, process.env.JWT_ACCOUNT_ACTIVATION,
            (err, decoded) => {
                if(err) {
                    return res.status(401).json({
                        error: 'Link has expired. Signup again'
                    })
                }
            })
    } else {
        //if valid then save to db
        const {name, email, password} = jwt.decode(token)

        const user = new User({
            name, 
            email,
            password
        })

        user.save((err,user) => {
            return res.status(401).json({
                error: err
            })
        })
    }
}