import { Router } from 'express';
const router = Router();

import { getBookings, getBookingById, createBooking, updateBooking, deleteBooking, getBookingsByUserId, getBookingsByEventId, getNextEvent } from '../controller/booking.js';

router.get('/', getBookings);
router.get('/users/:userId', getBookingsByUserId);
router.get('/nextEvent/:userId', getNextEvent);
router.get('/:userid/:eventid', getBookingById);
router.post('/', createBooking);
router.put('/:bookingId/:booking_status', updateBooking);
router.delete('/:bookingId', deleteBooking);
router.get('/event/:eventId', getBookingsByEventId);

export default router;
