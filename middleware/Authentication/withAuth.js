const jwt = require('jsonwebtoken');

const secret = process.env.SECRET
const withAuth = function(req, res, next) {
    const token =
        req.body.token ||
        req.query.token ||
        req.headers['x-access-token'] ||
        req.cookies.token
    ;
    
    if (!token) {
        res.status(401).send('No token provided');
    } else {
        jwt.verify(token, secret, function(err, decoded) {
            if (err) {
                res.status(401).send('Invalid token');
            } else {
                req.email = decoded.user.email;
                next();
            }
        });
    }
}
module.exports = withAuth;