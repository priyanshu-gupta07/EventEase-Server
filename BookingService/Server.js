const express = require ('express');
const dotenv = require('dotenv');
dotenv.config();
const Connection = require('./connection');
const bookingRouter = require('./routes/booking');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const PORT= process.env.PORT || 3002;
const app = express();

app.use(express.json());
Connection();
const allowedOrigins = ['http://localhost:3000', 'http://localhost:5000'];
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