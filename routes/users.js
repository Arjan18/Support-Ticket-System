const express = require('express');
const router = express.Router();

//User middleware
const currentUser = require('../middleware/currentUser');

//Authentication middleware
const withAuth = require('../middleware/Authentication/withAuth');
const authenticateAdmin = require('../middleware/Authentication/authenticateAdmin');
const authenticateSupport = require('../middleware/Authentication/authenticateSupport');
const authenticateUsers = require('../middleware/Authentication/authenticateUsers');

//Validation middleware
const loginValidation = require('../middleware/Validation/loginValidation');
const registerValidation = require('../middleware/Validation/registerValidation');

const UserController = require('../controllers/userController');
const LoginController = require('../controllers/loginController');

router.post('/api/register', registerValidation, UserController.create);
router.post('/api/login', loginValidation, LoginController.login);
router.post('/api/logout', withAuth,  LoginController.logout);

router.post('/api/update-user', authenticateAdmin, UserController.update); // Admin protection
router.get('/api/get-users', authenticateUsers, UserController.get); // Admin and Support
router.post('/api/delete-user', authenticateAdmin, UserController.delete); //Admin protection

router.get('/api/get-current-user', currentUser, UserController.currentUser); //WithAuth
router.get('/api/get-user-type', UserController.userTypes);
router.post('/api/approve-user', authenticateAdmin, UserController.approveUser); // Admin Protection

router.get('/checkToken', withAuth, function(req, res) {
    res.sendStatus(200);
});

module.exports = router;