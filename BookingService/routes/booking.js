const express = require('express');
const router = express.Router();

const {
    getBookings,
    getBookingById,
    createBooking,
    updateBooking,
    deleteBooking,
    getBookingsByUserId,
    getBookingsByEventId,
    getNextEvent
} = require('../controller/booking');

router.get('/', getBookings);
router.get('/users/:userId', getBookingsByUserId);
router.get('/nextEvent/:userId', getNextEvent);
router.get('/:userid/:eventid', getBookingById);
router.post('/', createBooking);
router.put('/:bookingId/:booking_status', updateBooking);
router.delete('/:bookingId', deleteBooking);
router.get('/event/:eventId', getBookingsByEventId);

module.exports = router;
