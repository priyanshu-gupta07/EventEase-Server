import express from 'express';
import { Connection } from './connection.js';
import userRouter from './routes/user.js';
import { configDotenv } from 'dotenv';
configDotenv();
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import proxy from 'express-http-proxy';

const app = express();
const PORT = process.env.PORT || 3003;

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
const allowedOrigins = [process.env.APP_URL];
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
app.use(express.urlencoded({ extended: true }));

// Connect to the database
Connection();

// Use routers
app.use('/user', userRouter);
app.use('/api/events', proxy(process.env.EVENT_SERVICE_URL)); 
app.use('/api/bookings', proxy(process.env.BOOKING_SERVICE_URL));

app.listen(PORT, () => {
    console.log(`API Gateway is running on port ${PORT}`);
});
