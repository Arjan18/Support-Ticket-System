const express = require('express');
const router = express.Router();
const withAuth = require('../middleware/Authentication/withAuth');
const getStatuses = require('../middleware/statuses');

//Validation middleware
const authenticateAdmin = require('../middleware/Authentication/authenticateAdmin');
const authenticateSupport = require('../middleware/Authentication/authenticateSupport');
const currentUser = require('../middleware/currentUser');

//Access Ticket Controllers
const TicketController = require('../controllers/ticketController');
const StatusController = require('../controllers/StatusController');


router.post('/create-ticket', [withAuth, getStatuses], TicketController.create);
router.get('/get-tickets', currentUser, TicketController.get);
router.post('/update-ticket', [withAuth, getStatuses], TicketController.update);

router.get('/get-status', withAuth, StatusController.get);


module.exports = router;