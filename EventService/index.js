const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const Connection = require("./connection");
const eventRouter = require('./routes/event');
const http = require('http');
const socketIo = require('socket.io');

const PORT = process.env.PORT || 3001;

const app = express();

// CORS settings
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

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Create HTTP server and attach socket.io to it
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "http://localhost:3000",  // Set allowed origins for socket connections
        methods: ["GET", "POST"],
        credentials: true,
    },
});

// Attach io instance to requests using middleware (placed once and correctly)
app.use((req, res, next) => {
    req.io = io;
    next();
});

// Connection to the database
Connection();

// Handle routes
app.use('/', eventRouter);

// Handle socket connections
io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

// Start the server
server.listen(PORT, () => {
    console.log('Server is running on port', PORT);
});

module.exports = { io };
