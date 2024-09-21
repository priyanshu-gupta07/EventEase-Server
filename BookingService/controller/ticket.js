const Ticket = require('../models/ticket');

const getTicketsByEvent = async (req, res) => {
    const { eventId } = req.params;
    try {
        const tickets = await Ticket.find({ event_id: eventId });
        res.json(tickets);
    } catch (err) {
        res.json({ message: err });
    }
};

const getTicketsByUser = async (req, res) => {
    const { userId } = req.params;
    try {
        const tickets = await Ticket.find({ user_id: userId });
        res.json(tickets);
    } catch (err) {
        res.json({ message: err });
    }
}

const createTicket = async (req, res) => {
    const ticket = new Ticket({
        event_id: req.body.event_id,
        user_id: req.body.user_id,
        event_name: req.body.event_name,
        username: req.body.username,
        booking_date: req.body.booking_date,
        booking_status: req.body.booking_status,
        price: req.body.price,
        seat_no: req.body.seat_no,
        count: req.body.count
    });
    try {
        const savedTicket = await ticket.save();
        res.json(savedTicket);
    } catch (err) {
        res.json({ message: err });
    }
};

const getTicket = async (req, res) => {
    const {userId, eventId} = req.params;
    try {
        const ticket = await Ticket.find({ user_id: userId, event_id: eventId });
        res.json(ticket);
    } catch (err) {
        res.json({ message: err });
    }
};

const deleteTicket = async (req, res) => {
    const { ticketId } = req.params;
    try {
        const removedTicket = await Ticket.remove({ ticketId });
        res.json(removedTicket);
    }
    catch (err) {
        res.json({ message: err });
    }
};

const getTicketById = async (req, res) => {
    const { ticketId } = req.params;
    try {
        const ticket = await Ticket.findById(ticketId);
        res.json(ticket);
    } catch (err) {
        res.json({ message: err });
    }
};

module.exports = { getTicketsByEvent, getTicketsByUser, createTicket, getTicket, deleteTicket, getTicketById };


