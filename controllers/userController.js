const db = require('../models/user');
const dbType = require('../models/userType');
const User = db;
const UserType = dbType;
const bcrypt = require('bcryptjs')
const ObjectID = require('mongodb').ObjectID;

exports.create = (req, res) => {
   const approved = req.body.approved != null ? req.body.approved : false;

  const department = req.body.department._id
  const user_type = req.body.user_type._id
  const { title, first_name, last_name, email, password } = req.body;
  const user = new User({ title, first_name, last_name, email, password, department, user_type, approved });

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
              department: req.body.department,
              user_type: req.body.user_type,
              approved: user.approved,
            }
          res.send(createdUser, 200);
        }
      });
    });
  });
};

exports.get = (req, res) => {
  User.find().populate(['department', 'user_type']).exec(function (err, data) {
    if (err) {
        res.status(500).send({
            message:err.message || "Some error occurred while retrieving Users."
        });
    }
    res.send(data);
  });
};

exports.update = (req, res) => {
  if (!req.body.title) {
    res.status(200).send({ errors: [{ title: "Title cannot be empty!" }]});
    return;
  }
  if (!req.body.first_name) {
    res.status(200).send({ errors: [{ first_name: "First name cannot be empty!" }]});
    return;
  }
  if (!req.body.last_name) {
    res.status(200).send({ errors: [{ last_name: "Last name cannot be empty!" }]});
    return;
  }
  if (!req.body.email) {
    res.status(200).send({ errors: [{ email: "Email cannot be empty!" }]});
    return;
  }

  if (!req.body.department) {
    res.status(200).send({ errors: [{ department: "Department cannot be empty!" }]});
    return;
  }
  if (!req.body.user_type) {
    res.status(200).send({ errors: [{ user_type: "Permisson type cannot be empty!" }]});
    return;
  }

  let password = req.body.password === '' ? req.body.user.password : req.body.password;
  const department = req.body.department._id;
  const user_type = req.body.user_type._id;
  const approved = req.body.approved != null ? req.body.approved : false;

  const { title, first_name, last_name, email } = req.body;
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, (err, hash) => {
      if (err) throw err;
      let password = hash;
      password = req.body.password === '' ? req.body.user.password : hash;
      User.findByIdAndUpdate(
        ObjectID(req.body.user._id), 
        {
            $set: {
              title: title, 
              first_name: first_name, 
              last_name: last_name, 
              email: email, 
              password: password,
              department: department,
              user_type: user_type,
              approved: approved,
            },
        },
        function(err, doc) {
          if (err) {
              res.status(500).send("Error editting this user, try again.");
          } else {
              const updatedUser = 
              {
                _id: req.body.user._id,
                title: title,
                first_name: first_name, 
                last_name: last_name, 
                email: email, 
                department: req.body.department,
                user_type: req.body.user_type,
                approved: approved,
              }
              res.status(200).send(updatedUser);            
          }
        }
      );
    });
  });
};

exports.delete = (req, res) => {
  if (!req.body.userId) {
    res.status(200).send({ errors: [{ user: "No user has been provided!" }]});
    return;
  }
  let userId = req.body.userId;

  User.deleteOne( { "_id" : userId }, function(err, user) {
    if (err) {
        res.status(500).send("Error deleting this user, try again.");
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
      message: err.message || "Some error occurred while retrieving User Types."
    });
  });
};

exports.approveUser = (req, res) => {
  if (!req.body.approved) {
    res.status(200).send({ errors: [{ approved: "You must approve or decline the user!" }]});
    return;
  }

  const { approved } = req.body;
  User.findByIdAndUpdate(
    ObjectID(req.body.user._id), 
    {
        $set: { approved: approved },
    },
    function(err, doc) {
      if (err) {
          res.status(500).send("Error approving this user, try again.");
      } else {
          const approvedUser = 
          {
            _id: req.body.user._id,
            title: req.body.user.title,
            first_name: req.body.user.first_name, 
            last_name: req.body.user.last_name, 
            email: req.body.user.email, 
            department: req.body.user.department,
            user_type: req.body.user.user_type,
            approved: approved,
          }
          res.status(200).send(approvedUser);            
      }
    }
  );
};

exports.currentUser = (req, res) => {
  let user = req.user.toObject();

  let isAdmin = user.user_type.type === 'admin' ? true : false;
  let isClient = user.user_type.type === 'client' ? true : false;
  let isSupport = user.user_type.type === 'support' ? true : false;
  user.isAdmin = isAdmin;
  user.isClient = isClient;
  user.isSupport = isSupport;
  res.send(user);
};