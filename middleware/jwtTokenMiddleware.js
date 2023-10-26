const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyJWT = (req, res, next) => {
    const authCookie = req.headers.authorization.split(' ')[1];

    if (!authCookie) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    jwt.verify(authCookie,"SECReT_JWT",(err, decoded) => {
        if (err) {
            console.log(err);
            if (err.name === 'JsonWebTokenError') {
                return res.status(403).json({ message: 'Invalid JWT token' });
            } else {
                return res.status(500).json({ message: 'Internal server error' });
            }
        }
        req.user=decoded.username;
        next();
    });
};

module.exports = verifyJWT;
