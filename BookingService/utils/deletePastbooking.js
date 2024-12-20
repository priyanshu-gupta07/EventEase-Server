import Booking from '../models/booking.js';

// Function to delete past events
async function deletePastbookings() {
  try {
    const currentDate = new Date();
    
    const result = await Booking.deleteMany({ event_date: { $lt: currentDate } });
    
    console.log(`Deleted ${result.deletedCount} past bookings.`);
  } catch (error) {
    console.error('Error deleting past events:', error);
  }
}

export default deletePastbookings;