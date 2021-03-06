const db = require('../models/user');
const dbType = require('../models/userType');
const User = db;
const UserType = dbType;
const bcrypt = require('bcryptjs')
const ObjectID = require('mongodb').ObjectID;

exports.create = (req, res) => {
  const user_type = req.body.user_type._id
  const { title, first_name, last_name, email, password, department} = req.body;
  const user = new User({ title, first_name, last_name, email, password, department, user_type,  });

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) throw err;
      user.password = hash;
      user.save(function(err) {
        if (err) {
          res.status(500).send("Error creating your user, try again.");
        } else {
          const createdUser = 
            {
              _id: user._id,
              title: user.title,
              first_name: user.first_name, 
              last_name: user.last_name, 
              email: user.email, 
              department: user.department,
              user_type: req.body.user_type,
            }
          res.send(createdUser, 200);
        }
      });
    });
  });
};

exports.get = (req, res) => {
  User.find().populate([ 'user_type']).exec(function (err, data) {
    if (err) {
        res.status(500).send({
            message:err.message || "Error attempting to retrieve Users."
        });
    }
    res.send(data);
  });
};

exports.update = (req, res) => {
  if (!req.body.title) {
    res.status(200).send({ errors: [{ title: "Please fill in this field" }]});
    return;
  }
  if (!req.body.first_name) {
    res.status(200).send({ errors: [{ first_name: "Please fill in this field" }]});
    return;
  }
  if (!req.body.last_name) {
    res.status(200).send({ errors: [{ last_name: "Please fill in this field" }]});
    return;
  }
  if (!req.body.email) {
    res.status(200).send({ errors: [{ email: "Please fill in this field" }]});
    return;
  }

  if (!req.body.department) {
    res.status(200).send({ errors: [{ department: "Please fill in this field" }]});
    return;
  }
  if (!req.body.user_type) {
    res.status(200).send({ errors: [{ user_type: "Please fill in this field" }]});
    return;
  }

  const user_type = req.body.user_type._id;

  const { title, first_name, last_name, email, department } = req.body;

      User.findByIdAndUpdate(
        ObjectID(req.body.user._id), 
        {
            $set: {
              title: title, 
              first_name: first_name, 
              last_name: last_name, 
              email: email, 
              department: department,
              user_type: user_type,
            },
        },
        function(err, doc) {
          if (err) {
              res.status(500).send("Unable to edit this user");
          } else {
              const updatedUser = 
              {
                _id: req.body.user._id,
                title: title,
                first_name: first_name, 
                last_name: last_name, 
                email: email, 
                department: department,
                user_type: req.body.user_type,
              }
              res.status(200).send(updatedUser);            
          }
        }
      );
};

exports.delete = (req, res) => {
  if (!req.body.userId) {
    res.status(200).send({ errors: [{ user: "No user has been provided!" }]});
    return;
  }
  let userId = req.body.userId;

  User.deleteOne( { "_id" : userId }, function(err, user) {
    if (err) {
        res.status(500).send("Error deleting this user");
    } else {
        res.status(200).send(user);            
    }
  });
};

exports.userTypes = (req, res) => {
  UserType.find().then(data => {
    res.send(data);
  }).catch(err => {
    res.status(500).send({
      message: err.message || "Error occurred while retrieving User Types."
    });
  });
};

exports.currentUser = (req, res) => {
  let user = req.user.toObject();
  let isAdmin = user.user_type.type === 'Admin' ? true : false;
  let isClient = user.user_type.type === 'Client User' ? true : false;
  let isSupport = user.user_type.type === 'Support Worker' ? true : false;
  user.isAdmin = isAdmin;
  user.isClient = isClient;
  user.isSupport = isSupport;
  res.send(user);
};