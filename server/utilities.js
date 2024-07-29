const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        console.log('No token provided');
        return res.sendStatus(401); // Unauthorized
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            if (err.name === 'TokenExpiredError') {
                console.log('Token has expired');
                return res.status(401).json({ message: 'Token has expired' }); // Unauthorized
            }
            console.log('Invalid token:', err.message);
            return res.status(403).json({ message: 'Invalid token' }); // Forbidden
        }
        req.user = user;
        next();
    });
}

module.exports = { authenticateToken };

