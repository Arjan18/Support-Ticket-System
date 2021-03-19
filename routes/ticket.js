const express = require('express');
const router = express.Router();
const withAuth = require('../middleware/Authentication/withAuth');
const getStatuses = require('../middleware/statuses');

const authenticateAdmin = require('../middleware/Authentication/authenticateAdmin');
const authenticateSupport = require('../middleware/Authentication/authenticateSupport');
const currentUser = require('../middleware/currentUser');

const TicketController = require('../controllers/ticketController');
const ColumnController = require('../controllers/columnController');

router.post('/create-ticket', [withAuth, getStatuses], TicketController.create);

router.get('/get-tickets', currentUser, TicketController.get);

router.post('/update-ticket', [withAuth, getStatuses], TicketController.update);

router.post('/create-column', authenticateAdmin, ColumnController.create);
router.get('/get-columns', withAuth, ColumnController.get);


module.exports = router;