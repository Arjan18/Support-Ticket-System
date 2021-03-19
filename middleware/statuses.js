const db_status = require('../models/column');
const Status = db_status;

const getStatuses = function(req, res, next) {
    
    Status.find().exec(function(err, data) {
        if (err) {
            next();
        } else {
            req.status = data;
            next();
        }
    });
}
module.exports = getStatuses;