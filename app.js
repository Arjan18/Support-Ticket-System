const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(cookieParser());

app.use(cors({
    origin: [
        'http://localhost:8080',
    ],
    credentials: true,
}));

const db = require('./models');
db.mongoose.connect(db.uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to database');
    app.listen(3000, () => {
        console.log(`Server is running on port 3000`);
    });
}).catch(err => {
    console.log('Error connecting database!', err);
    process.exit();
});

app.use('/', require('./routes/users'));
app.use('/ticket', require('./routes/ticket'));

app.use(function (err, req, res, next) {
    console.error(err.message);
    if (!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send(err.message);
});