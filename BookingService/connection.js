const mongoose = require('mongoose');
const deletePastbookings = require('./utils/deletePastbooking');

const ConnectionString = "mongodb+srv://bt22cse188:Password@cryptobazar.eit1e8b.mongodb.net/?retryWrites=true&w=majority&appName=CryptoBazar";

const Connection = () => {
    return mongoose.connect(ConnectionString)
        .then(() => {
            console.log('Database connected successfully');
            deletePastbookings();

            setInterval(deletePastbookings, 24 * 60 * 60 * 1000);
        })
        .catch((err) => {
            console.log(err);
        });
};

module.exports = Connection;