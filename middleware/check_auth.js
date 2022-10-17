const jwt = require('jsonwebtoken');
JWT_SECRET = 'asdasdasdasdsdf+659+523ewrfgarf6r5faw+f+-**/-/-*/*5*/3-*5/3-*5/266345^&*(^%&UJHUH' //use atob

// This middleware performs authorization using JWT token
module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, JWT_SECRET);
        
        // Token verification successful
        req.userData = decoded;
        next();
    } catch (err) {
        // Token verification failed
        return res.status(401).json('Auth failed');
    }
};