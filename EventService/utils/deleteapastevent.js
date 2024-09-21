const Event = require('../models/events'); // Adjust the path as needed

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

module.exports = deletePastEvents;