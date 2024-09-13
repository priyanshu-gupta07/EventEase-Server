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

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(cors({
    origin: 'http://localhost:5000',
    credentials: true,
}));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use('/', eventRouter);

Connection();
app.listen(PORT, () => {
    console.log('Server is running on port 3001');
});
