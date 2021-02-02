const User = require('../models/User');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

exports.authenticateUser = async (req, res) => {

    ///Check if we have errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try 
    {
        let user = await User.findOne({ email });   
        if (!user) {
            return res.status(400).json({ msg: `The user with email ${email} doesn't exist, plis try with another one`});
        }

        const correctPassword = await bcryptjs.compare(password, user.password);

        if (!correctPassword) {
            return res.status(400).json({ msg: `Incorrect password`});
        }

        ///Create and signing jwt
        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(payload, process.env.SECRET, {
            expiresIn: 3600
        }, (error, token) => {
            if (error) throw error;
            res.json({ token: token });
        });

    } catch (error) {
        console.log(error);
        res.status(500).send('Have been a bug, sorry');
    }
}

exports.authenticatedUser = async (req, res) => {

    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json({user});
    } catch (error) {
        console.log(error);
        res.status(500).send('Have been a bug, sorry');
    }
}