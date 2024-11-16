import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import http from 'http';
import { Server } from 'socket.io';
import Connection from './connection.js';  // Note: .js extension is required
import eventRouter from './routes/event.js';  // Note: .js extension is required

dotenv.config();

const PORT = process.env.PORT || 3001;

const app = express();

// CORS settings
const allowedOrigins = [process.env.APP_URL,process.env.GATEWAY_URL];
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
const io = new Server(server, {
    cors: {
        origin: process.env.APP_URL,  // Set allowed origins for socket connections
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
app.listen(PORT, () => {
    console.log('Server is running on port', PORT);
});

export default { io };
