const jwt = require('jsonwebtoken');
const UserModel = require('../models/mongo'); 
require('dotenv').config();  // Import your User model

// Middleware to authenticate and attach user to request
const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
    console.log('Auth Header:', authHeader); // Debugging line

    if (authHeader) {
        const token = authHeader.split(' ')[1];  // This splits the Bearer token
        console.log('Token:', token); // Debugging line

        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                return res.status(403).json({ message: 'Token verification failed', error: err });
            }
            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};


module.exports = authenticateJWT;