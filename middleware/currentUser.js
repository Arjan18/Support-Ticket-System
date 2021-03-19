const jwt = require('jsonwebtoken');
const db = require('../models/user');
const User = db;

const secret = process.env.SECRET
const currentUser = function(req, res, next) {
    const token =
        req.body.token ||
        req.query.token ||
        req.headers['x-access-token'] ||
        req.cookies.token
    ;
    
    if (!token) {
        res.status(401).send('Unauthorized: No token provided');
    } else {
        jwt.verify(token, secret, function(err, decoded) {
            if (err) {
                res.status(401).send('Unauthorized: Invalid token');
            } else {
                User.findOne({ 'email': decoded.user.email })
                .populate([ 'user_type']).exec(function(err, user) {
                    if (err) throw err;
                    req.user = user;
                    next();
                });
            }
        });
    }
}
module.exports = currentUser;