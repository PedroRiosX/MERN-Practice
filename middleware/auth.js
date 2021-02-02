const jwt = require('jsonwebtoken');

module.exports = function(req, res, next){
    ///Read token from header
    const token = req.header('x-auth-token');
    
    ///Validate if there isn't token
    if (!token) {
        return res.status(401).json({ msg: `Sorry, but you don't have permissions to do this` });
    }

    try {
        const coded = jwt.verify(token, process.env.SECRET);
        req.user = coded.user;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).send(`Token not valid`);
    }
}