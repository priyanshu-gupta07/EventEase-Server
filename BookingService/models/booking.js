import { Schema, model } from 'mongoose';

const BookingSchema = new Schema({
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
    },
    Amount_paid: {
        type: Number,
        required: true
    },
    seat_no:{
        type: [Number],
        required: true
    },
    count: {
        type: Number,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    event_name: {
        type: String,
        required: true
    },
    event_date: {
        type: Date,
        required: true
    }
});

const Booking = model('Booking', BookingSchema);

export default Booking;