const registerValidation = function(req, res, next) {

    let Error = {};
    if (!req.body.title) {
        Error.title = "Title cannot be empty!";
    }
    if (!req.body.first_name) {
        Error.first_name = "First name cannot be empty!";
    }
    if (!req.body.last_name) {
        Error.last_name = "Last name cannot be empty!";
    }
    if (!req.body.email) {
        Error.email = "Email cannot be empty!";
    }

    if (!req.body.password) {
        Error.password = "Password cannot be empty!";
    }

    if (!req.body.department) {
        Error.department = "Department cannot be empty!"
    }

    if (!req.body.user_type) {
        Error.user_type = "Permisson type cannot be empty!";
    }
    if (JSON.stringify(Error) !== '{}') {
        res.json({Error});
        return
    }
    next();
}
module.exports = registerValidation;