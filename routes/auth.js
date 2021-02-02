///Routes to authenticate users
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authsController');
const { check } = require('express-validator');
///Middleware
const auth = require('../middleware/auth');

///Create an user
///api/auth
router.post('/',
    authController.authenticateUser
);

router.get('/',
    auth,
    authController.authenticatedUser
);

module.exports = router;