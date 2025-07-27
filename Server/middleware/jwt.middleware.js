const jwt = require('jsonwebtoken');

module.exports = {
    authenticate: (req, res, next) => {
        const token = req.cookies.usertoken; // Assuming token is in a cookie named 'usertoken'

        if (!token) {
            return res.status(401).json({ message: "Not authorized: No token provided" });
        }

        jwt.verify(token, process.env.SECRET_KEY, (err, payload) => {
            if (err) {
                return res.status(401).json({ message: "Not authorized: Invalid token" });
            }
            req.user = payload; // Attach user payload (e.g., { _id: 'userId', model: 'User' }) to the request
            next();
        });
    },
};