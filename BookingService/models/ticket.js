const mongoose = require('mongoose');

const TicketSchema = new mongoose.Schema({
    event_id: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true
    },
    event_name: {
        type: String,
        required: true
    },
    username: {
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
    price: {
        type: Number,
        required: true
    },
    seat_no:{
        type: Number,
        required: true
    },
    count: {
        type: Number,
        required: true
    }
});

const Ticket = mongoose.model('Ticket', TicketSchema);

module.exports = Ticket;