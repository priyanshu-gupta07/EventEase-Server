import { connect } from 'mongoose';
import deletePastbookings from './utils/deletePastbooking.js';

const ConnectionString = "mongodb+srv://bt22cse188:Password@cryptobazar.eit1e8b.mongodb.net/?retryWrites=true&w=majority&appName=CryptoBazar";

const Connection = async () => {
    try {
        await connect(ConnectionString);
        console.log('Database connected successfully');
        deletePastbookings();

        setInterval(deletePastbookings, 24 * 60 * 60 * 1000);
    } catch (err) {
        console.log(err);
    }
};

export default Connection;