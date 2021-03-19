const loginValidation = function(req, res, next) {
    let Error = {}
    if (!req.body.email) {
        Error.email = "Please enter your email";
    }
    
    if (!req.body.password) {       
        Error.password = "Please enter your password";
    } 
    
    if (JSON.stringify(Error) !== '{}') {
        res.json({Error});
        return
    }
    next();
}
module.exports = loginValidation;