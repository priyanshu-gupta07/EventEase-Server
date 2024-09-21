const Booking = require('../models/booking'); // Adjust the path as needed

// Function to delete past events
async function deletePastbookings() {
  try {
    const currentDate = new Date();
    
    const result = await Booking.deleteMany({ booking_date: { $lt: currentDate } });
    
    console.log(`Deleted ${result.deletedCount} past bookings.`);
  } catch (error) {
    console.error('Error deleting past events:', error);
  }
}

module.exports = deletePastbookings;