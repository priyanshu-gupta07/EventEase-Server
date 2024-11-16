import express from 'express';
import dotenv from 'dotenv';
import Connection from './connection.js';  // Note: .js extension required
import bookingRouter from './routes/booking.js';  // Note: .js extension required
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';

dotenv.config();

const PORT= process.env.PORT || 3002;
const app = express();

app.use(express.json());
Connection();
const allowedOrigins = [process.env.APP_URL, process.env.GATEWAY_URL];
app.use(cors({
    origin: function (origin, callback) {
        if (!origin) return callback(null, true);
        if (allowedOrigins.includes(origin)) {
            return callback(null, true);
        } else {
            return callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
}));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', bookingRouter);

app.listen(PORT, () => {
    console.log(`Booking Service is running on port ${PORT}`);
})