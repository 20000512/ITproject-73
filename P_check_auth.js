const jwt = require('jsonwebtoken');
// Used for comparing plain token with hashed token
const bcrypt  = require('bcryptjs');
// Used for getting current session hashed token
let User = require('../models/user.model');
JWT_SECRET = 'asdasdasdasdsdf+659+523ewrfgarf6r5faw+f+-**/-/-*/*5*/3-*5/3-*5/266345^&*(^%&UJHUH' //use atob

// This middleware performs authorization using JWT token
module.exports = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        // Verify the token is created using JWT_SECRET
        const decoded = jwt.verify(token, JWT_SECRET);
        
        // Token verification successful, check if token have expired
        req.userData = decoded;
        const user = await User.findById(req.userData.id);
        
        console.log(await bcrypt.compare(token, user.currentToken));
        
        if (await bcrypt.compare(token, user.currentToken)) {
            // Token belongs to current session
            next();
        }
        else {
            // Token expired due to newer logins
            return res.status(401).json('Session expired');
        }
        
    } catch (err) {
        // Token verification failed
        return res.status(401).json('Auth failed');
    }
};