const express = require('express');
const router = express.Router();

//User middleware - get ID of current User
const currentUser = require('../middleware/currentUser');

//Authentication middleware
const withAuth = require('../middleware/Authentication/withAuth');
const authenticateAdmin = require('../middleware/Authentication/authenticateAdmin');
const authenticateUsers = require('../middleware/Authentication/authenticateUsers');

//Validation middleware
const loginValidation = require('../middleware/Validation/loginValidation');
const registerValidation = require('../middleware/Validation/registerValidation');

//Access User Controllers
const UserController = require('../controllers/userController');
const LoginController = require('../controllers/loginController');

router.post('/api/register', registerValidation, UserController.create);
router.post('/api/login', loginValidation, LoginController.login);
router.post('/api/logout', withAuth,  LoginController.logout);

//User Validation
router.post('/api/update-user', authenticateAdmin, UserController.update);
router.get('/api/get-users', authenticateUsers, UserController.get);
router.post('/api/delete-user', authenticateAdmin, UserController.delete);
router.get('/api/get-current-user', currentUser, UserController.currentUser);
router.get('/api/get-user-type', UserController.userTypes);

router.get('/checkToken', withAuth, function(req, res) {
    res.sendStatus(200);
});
router.get('/checkAdmin', authenticateAdmin, function(req, res) {
    res.sendStatus(200);
});

module.exports = router;