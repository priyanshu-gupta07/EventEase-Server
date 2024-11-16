import Event from "../models/events.js";

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
    console.log("here");
    try {
        const { title, description, date, location, availableSeats, price, image, tags, organizerEmail } = req.body;
        
        const newEvent = new Event({
          title,
          description,
          date,
          location,
          AvailableSeats: availableSeats,
          bookedSeats: 0,
          price,
          image,
          Tags: tags.split(','),
          likecount: 0,
          comments: [],
          organizer_email: organizerEmail
        });
    
        await newEvent.save();
        res.status(201).json(newEvent);
      } catch (error) {
        res.status(400).json({ message: error.message });
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
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const { email } = req.params;
        const events = await Event.find({ organizer_email: email,date: { $gte: today }});

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

const updateEventseats = async (req, res) => {
    const id = req.params.id;
    const { seats } = req.body;
    const seat = parseInt(seats);

    try {
        // Find the event by id
        const event = await Event.findById(id);

        if (!event) {
            return res.status(404).send('Event not found');
        }

        const availableSeats = event.AvailableSeats - event.bookedSeats;

        if (availableSeats < seat) {
            return res.status(400).send('Not enough seats available');
        }

        const startSeat = event.bookedSeats + 1;

        // Proceed to update the booked seats
        event.bookedSeats += seat;
        await event.save();

        // Now that the event is updated, calculate the newly booked seats
        const newlyBookedSeatsArray = Array.from({ length: seat }, (_, index) => startSeat + index);

        // Emit the updated seats to all connected clients via WebSocket
        // console.log(req.io);
        req.io.emit('seatsUpdated', {
            eventId: id,
            newlyBookedSeats: newlyBookedSeatsArray,
            totalBookedSeats: event.bookedSeats
        });

        // Send the response after emitting
        res.send(newlyBookedSeatsArray);

    } catch (error) {
        console.error('Error updating event seats:', error);
        res.status(500).send('Internal Server Error');
    }
};




export  {
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
    updateEventseats,
};

