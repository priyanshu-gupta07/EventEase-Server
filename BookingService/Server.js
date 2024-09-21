const express = require ('express');
const dotenv = require('dotenv');
dotenv.config();
const Connection = require('./connection');
const bookingRouter = require('./routes/booking');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const ticketRouter = require('./routes/ticket');

const PORT= process.env.PORT || 3002;
const app = express();

app.use(express.json());
Connection();
app.use(cors({
        origin: 'http://localhost:5000',
        credentials: true
}));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/booking', bookingRouter);
app.use('/ticket', ticketRouter);

app.listen(PORT, () => {
    console.log(`Booking Service is running on port ${PORT}`);
})