// Validation helpers
const {
    check
} = require('express-validator');

//Register
exports.validRegister = [
    check('name', 'Name is required').isEmpty()
    .isLength({
        min:4,
        max:32
    }).withMessage('Name must be between 3 and 32 characters long'),
    check('email').isEmpty().withMessage('Must be a valid email address'),
    check('password', 'password is required').notEmpty(),
    check('password').isLength({
        min:6
    }).withMessage('Password must contain at least 6 characters').matches(/\d/).withMessage('Password must contain a number')
]

//Login
exports.validLogin = [
    check('email')
    .isEmail()
    .withMessage('Must be a valid email address'),
    check('password', 'Password is required').notEmpty()
]

//Reset Password 
exports.forgotPasswordValidator = [
    check('email')
        .not()
        .isEmpty()
        .isEmail()
        .withMessage('Must be a valid email address')
];

// Reset Password
exports.resetPasswordValidator = [
    check('newPassword')
        .not()
        .isEmpty()
        .isLength({ min: 6 })
        .withMessage('Password must be at least  6 characters long')
];