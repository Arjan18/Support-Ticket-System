const db = require('../models/department');
const Department = db;

exports.create = (req, res) => {

    if (!req.body.name) {
        res.status(400).send({ name: "Name cannot be empty!" });
        return;
    }

    const { name } = req.body;
    const department = new Department({ name });

    department.save(function(err) {
        if (err) {
            res.status(500).send("Error creating a department, try again.");
        } else {
            res.send(department, 200);
        }
    });
};

exports.get = (req, res) => {
    Department.find().then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving Departments."
        });
    });
};