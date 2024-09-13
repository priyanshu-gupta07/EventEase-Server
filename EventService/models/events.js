const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    AvailableSeats: {
        type: Number,
        required: true
    },
    bookedSeats: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    Tags: {
        type:[String],
        required: true,
    },
    likecount: {
        type: Number,
        required: true
    },
    comments: {
        type: [String],
        required: true
    },
    organizer_email: {
        type: String,
        required: true
    },
});

const Event = mongoose.model('Event', EventSchema);

module.exports = Event;