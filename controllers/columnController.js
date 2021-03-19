const db = require('../models/column');
const Column = db;

exports.create = (req, res) => {

    if (!req.body.name) {
        res.status(400).send({ name: "Name cannot be empty!" });
        return;
    }

    const { name } = req.body;
    const column = new Column({ name });

    column.save(function(err) {
        if (err) {
            res.status(500).send("Error creating a column, try again.");
        } else {
            res.send(column, 200);
        }
    });
};

exports.get = (req, res) => {
    Column.find().then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving Columns."
        });
    });
};