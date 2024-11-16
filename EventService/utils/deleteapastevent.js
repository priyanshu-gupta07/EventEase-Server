import Event from '../models/events.js';

// Function to delete past events
async function deletePastEvents() {
  try {
    const currentDate = new Date();
    
    const result = await Event.deleteMany({ date: { $lt: currentDate } });
    
    console.log(`Deleted ${result.deletedCount} past events.`);
  } catch (error) {
    console.error('Error deleting past events:', error);
  }
}

export default deletePastEvents;