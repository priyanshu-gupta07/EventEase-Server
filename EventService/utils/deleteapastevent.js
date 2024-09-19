const mongoose = require('mongoose');
const Event = require('../models/events'); // Adjust the path as needed

// MongoDB connection string
const mongoURI = 'mongodb://localhost:27017/your_database_name'; // Replace with your actual MongoDB URI

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