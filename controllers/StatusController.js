const db = require('../models/status');
const Status = db;

exports.create = (req, res) => {
    if (!req.body.name) {
        res.status(400).send({ name: "Name cannot be empty!" });
        return;
    }
    
    const { name } = req.body;
    const Status = new Status({ name });

    Status.save(function(err) {
        if (err) {
            res.status(500).send("Error creating a Status, try again.");
        } else {
            res.send(Status, 200);
        }
    });
};

exports.get = (req, res) => {
    Status.find().then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving Status."
        });
    });
};