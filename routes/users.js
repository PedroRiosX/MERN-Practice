///Routes to create users
const express = require('express');
const router = express.Router();
///importing users controller
const usersController = require('../controllers/usersController');
///Validator
const { check } = require('express-validator');


///Create an user
router.post('/',
    [
        check('name', "The field name is required").not().isEmpty(),
        check('email', "The field email is required").not().isEmpty(),
        check('email', "The mail isn't valid, plis try with a valid email").isEmail(),
        check('password', "The field password is required").not().isEmpty(),
        check('password', "Password must be atleast 6 characters").isLength({min: 6})
    ],
    usersController.createUser
);
module.exports = router;