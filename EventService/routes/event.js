const express = require('express');
const router = express.Router();
const {
    createEvent,
    getAvailableEvents,
    getSingleEvent,
    updateEvent,
    deleteEvent,
    getEventsByDate,
    getEventsByOrganizer,
    getEventsByTitle,
    getEventsByLocation,
    getEventsByTag
} = require('../controllers/event'); // Adjust path as needed

// Basic CRUD routes
router.post('/events', createEvent);
router.get('/events', getAvailableEvents);
router.get('/events/:id', getSingleEvent);
router.put('/events/:id', updateEvent);
router.delete('/events/:id', deleteEvent);

// Advanced search routes
router.get('/events/date/:date', getEventsByDate);
router.get('/events/organizer/:email', getEventsByOrganizer);
router.get('/events/title/:title', getEventsByTitle);
router.get('/events/location/:location', getEventsByLocation);
router.get('/events/tag/:tag', getEventsByTag);

module.exports = router;
