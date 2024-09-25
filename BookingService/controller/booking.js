const Booking = require('../models/booking');

const getBookings = async (req, res) => {
    try {
        const bookings = await Booking.find();
        res.json(bookings);
    } catch (err) {
        res.json({ message: err });
    }
};

const getBookingById = async (req, res) => {
    const { userid,eventid } = req.params;
    try {
        const booking = await Booking.findById({user_id:userid,event_id:eventid});
        res.json(booking);
    }
    catch (err) {
        res.json({ message: err });
    }
};

const createBooking = async (req, res) => {
    const booking = new Booking({
        event_id: req.body.event_id,
        user_id: req.body.user_id,
        booking_date: req.body.booking_date,
        booking_status: req.body.booking_status,
        event_name: req.body.event_name,
        Amount_paid: req.body.Amount_paid,
        seat_no: req.body.seat_no,
        count: req.body.count,
        username: req.body.username,
        event_date: req.body.event_date
    });
    try {
        const savedBooking = await booking.save();
        res.json(savedBooking);
    } catch (err) {
        res.json({ message: err });
    }
};

const updateBooking = async (req, res) => {
    const { bookingId,booking_status } = req.params;
    try {
        const updatedBooking = await Booking.updateOne({ _id: bookingId }, { $set: { booking_status: booking_status } });
        res.json(updatedBooking);
    }
    catch (err) {
        res.json({ message: err });
    }
};

const deleteBooking = async (req, res) => {
    const { bookingId } = req.params;
    try {
        const removedBooking = await Booking.remove({ _id: bookingId });
        res.json(removedBooking);
    }
    catch (err) {
        res.json({ message: err });
    }
};

const getBookingsByUserId = async (req, res) => {
    const { userId } = req.params;
    try {
        const bookings = await Booking.find({ user_id: userId });
        res.json(bookings);
    } catch (err) {
        res.json({ message: err });
    }
};


const getBookingsByEventId = async (req, res) => {
    const { eventId } = req.params;
    try {
        const bookings = await Booking.find({ event_id: eventId });
        res.json(bookings);
    } catch (err) {
        res.json({ message: err });
    }
};

module.exports = { getBookings, getBookingById, createBooking, updateBooking, deleteBooking, getBookingsByUserId, getBookingsByEventId};