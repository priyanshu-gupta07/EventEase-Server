const Ticket = require('../models/ticket'); // Adjust the path as needed

// Function to delete past events
async function deletePasttickets() {
  try {
    const currentDate = new Date();
    
    const result = await Ticket.deleteMany({ booking_date: { $lt: currentDate } });
    
    console.log(`Deleted ${result.deletedCount} past tickets.`);
  } catch (error) {
    console.error('Error deleting past events:', error);
  }
}

module.exports = deletePasttickets;