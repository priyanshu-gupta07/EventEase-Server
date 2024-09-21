const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
    event_id: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true
    },
    booking_date: {
        type: Date,
        required: true
    },
    booking_status: {
        type: String,
        required: true
    }
});

const Booking = mongoose.model('Booking', BookingSchema);

module.exports = Booking;