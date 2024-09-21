const express = require('express');
const router = express.Router();
const { getTicketsByEvent, getTicketsByUser, createTicket, getTicket, deleteTicket, getTicketById } = require('../controller/ticket');

router.get('/event/:eventId', getTicketsByEvent);
router.get('/user/:userId', getTicketsByUser);
router.post('/', createTicket);
router.get('/:userId/event/:eventId', getTicket);
router.delete('/:ticketId', deleteTicket);
router.get('/:ticketId', getTicketById);

module.exports = router;
