require('dotenv').config();
let express = require('express');
let mongoose = require('mongoose');
let cookieParser = require('cookie-parser');


let bodyParser = require('body-parser');
let cors = require('cors');

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
// app.use('/department', require('./routes/department'));

app.use(function (err, req, res, next) {
    console.error(err.message);
    if (!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send(err.message);
});