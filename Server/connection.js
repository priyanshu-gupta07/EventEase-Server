import mongoose from 'mongoose';

const ConnectionString = "mongodb+srv://bt22cse188:Password@cryptobazar.eit1e8b.mongodb.net/?retryWrites=true&w=majority&appName=CryptoBazar";

export const Connection = () => {
    return mongoose.connect(ConnectionString)
        .then(() => {
            console.log('Database connected successfully');
        })
        .catch((err) => {
            console.log(err);
        });
};