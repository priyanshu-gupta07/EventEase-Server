const mongoose = require('mongoose');
const deletePastEvents = require('./utils/deleteapastevent'); // Adjust the path as needed

const ConnectionString = "mongodb+srv://bt22cse188:Password@cryptobazar.eit1e8b.mongodb.net/?retryWrites=true&w=majority&appName=CryptoBazar";

const Connection = () => {
    return mongoose.connect(ConnectionString)
        .then(() => {
            console.log('Database connected successfully');
            deletePastEvents();
    
    // Set up interval to check and delete past events every 24 hours
            setInterval(deletePastEvents, 24 * 60 * 60 * 1000);
        })
        .catch((err) => {
            console.log(err);
        });
};

module.exports = Connection;