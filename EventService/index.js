const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const Connection = require("./connection");
const eventRouter = require('./routes/event');

const PORT = process.env.PORT || 3001;

const app = express();

// List of allowed origins
const allowedOrigins = ['http://localhost:3000', 'http://localhost:5000'];

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin like mobile apps or curl requests
        if (!origin) return callback(null, true);
        if (allowedOrigins.includes(origin)) {
            return callback(null, true);
        } else {
            return callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
}));

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use('/', eventRouter);

Connection();
app.listen(PORT, () => {
    console.log('Server is running on port', PORT);
});
