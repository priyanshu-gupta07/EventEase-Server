const Event = require("../models/events");

const getAvailableEvents = async (req, res) => {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Set the time to midnight to ignore the time part

        // Find events where the date is today or in the future
        const events = await Event.find({ date: { $gte: today } });

        res.send(events);
    } catch (error) {
        console.error('Error fetching available events:', error);
        res.status(500).send('Internal Server Error');
    }
};

const createEvent = async (req, res) => {
    try {
        const newEvent = new Event(req.body);
        await newEvent.save();
        res.status(201).send(newEvent);
    } catch (error) {
        console.error('Error creating event:', error);
        res.status(400).send('Bad Request');
    }
};

const getSingleEvent = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);

        if (!event) {
            return res.status(404).send('Event not found');
        }

        res.send(event);
    } catch (error) {
        console.error('Error fetching event:', error);
        res.status(500).send('Internal Server Error');
    }
};

const updateEvent = async (req, res) => {
    try {
        const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

        if (!event) {
            return res.status(404).send('Event not found');
        }

        res.send(event);
    } catch (error) {
        console.error('Error updating event:', error);
        res.status(400).send('Bad Request');
    }
};

const deleteEvent = async (req, res) => {
    try {
        const event = await Event.findByIdAndDelete(req.params.id);

        if (!event) {
            return res.status(404).send('Event not found');
        }

        res.send('Event deleted successfully');
    } catch (error) {
        console.error('Error deleting event:', error);
        res.status(500).send('Internal Server Error');
    }
};

const getEventsByDate = async (req, res) => {
    try {
        const { date } = req.params;  // Expecting date in YYYY-MM-DD format
        const events = await Event.find({ date: new Date(date) });

        if (events.length === 0) {
            return res.status(404).send('No events found for the given date');
        }

        res.send(events);
    } catch (error) {
        console.error('Error fetching events by date:', error);
        res.status(500).send('Internal Server Error');
    }
};

const getEventsByOrganizer = async (req, res) => {
    try {
        const { email } = req.params;
        const events = await Event.find({ organizer_email: email });

        if (events.length === 0) {
            return res.status(404).send('No events found for the given organizer');
        }

        res.send(events);
    } catch (error) {
        console.error('Error fetching events by organizer:', error);
        res.status(500).send('Internal Server Error');
    }
};

const getEventsByTitle = async (req, res) => {
    try {
        const { title } = req.params;
        const events = await Event.find({ title: { $regex: title, $options: 'i' } }); // Case-insensitive search

        if (events.length === 0) {
            return res.status(404).send('No events found with the given title');
        }

        res.send(events);
    } catch (error) {
        console.error('Error fetching events by title:', error);
        res.status(500).send('Internal Server Error');
    }
};

const getEventsByLocation = async (req, res) => {
    try {
        const { location } = req.params;
        const events = await Event.find({ location: { $regex: location, $options: 'i' } }); // Case-insensitive search

        if (events.length === 0) {
            return res.status(404).send('No events found for the given location');
        }

        res.send(events);
    } catch (error) {
        console.error('Error fetching events by location:', error);
        res.status(500).send('Internal Server Error');
    }
};

const getEventsByTag = async (req, res) => {
    try {
        const { tag } = req.params;
        const events = await Event.find({ Tags: { $in: [tag] } });

        if (events.length === 0) {
            return res.status(404).send('No events found with the given tag');
        }

        res.send(events);
    } catch (error) {
        console.error('Error fetching events by tag:', error);
        res.status(500).send('Internal Server Error');
    }
};

module.exports = {
    getEventsByDate,
    getEventsByOrganizer,
    getEventsByTitle,
    getEventsByLocation,
    getEventsByTag,
    getAvailableEvents,
    createEvent,
    getSingleEvent,
    updateEvent,
    deleteEvent,
};

