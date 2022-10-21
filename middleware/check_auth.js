const jwt = require('jsonwebtoken');
let User = require('../models/user.model');

// This middleware performs authorization using JWT token
module.exports = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        // Verify token is signed using JWT_SECRET
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Token verification successful, continue authenticating token
        req.userData = decoded;
        const user = await User.findById(req.userData.id);

        if (!user) {
           // User do not exist
           return res.status(401).json('User do not exist'); 
        }
        else if (req.userData.loginTime < user.currentLoginTime) {
            // Token expired due to newer logins
            return res.status(401).json('Session expired');
        }
        else {
            // Token belongs to current session
            next();
        }
    } catch (err) {
        // Invalid token
        return res.status(401).json('Invalid token');
    }
};