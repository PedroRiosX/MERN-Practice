const User = require('../models/User');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

exports.createUser = async (req, res) =>{

    ///Check if we have errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    const { email, password } = req.body;

    try {

        ///Validate data
        let user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({msg: `The email ${email} already exist, plis try with another one`})
        }

        user = new User(req.body);

        ///Hashear password
        const salt = await bcryptjs.genSalt(10);
        user.password = await bcryptjs.hash(password, salt);

        await user.save();

        ///Create and signing jwt
        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(payload, process.env.SECRET, {
            expiresIn: 3600000
        }, (error, token) => {
            if (error) throw error;
            res.json({ token: token });
        });
    } catch (error) {
        console.log(error);
        res.status(500).send('Have been a bug, sorry');
    }
}