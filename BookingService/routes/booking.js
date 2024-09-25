const express = require('express');
const router = express.Router();

const {
    getBookings,
    getBookingById,
    createBooking,
    updateBooking,
    deleteBooking,
    getBookingsByUserId,
    getBookingsByEventId
} = require('../controller/booking');

router.get('/', getBookings);
router.get('/:userid/:eventid', getBookingById);
router.post('/', createBooking);
router.put('/:bookingId/:booking_status', updateBooking);
router.delete('/:bookingId', deleteBooking);
router.get('/user/:userId', getBookingsByUserId);
router.get('/event/:eventId', getBookingsByEventId);

module.exports = router;
