import express from 'express';
import { Connection } from './connection.js';
import userRouter from './routes/user.js';
import { configDotenv } from 'dotenv';
configDotenv();
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import adminrouter from "./routes/admin.js";
import Organiserrouter from "./routes/organiser.js";
import proxy from 'express-http-proxy';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(cors({}));
app.use(express.urlencoded({ extended: true }));

// Connect to the database
Connection();

// Use routers
app.use('/user', userRouter);
app.use('/admin', adminrouter);
app.use('/api/events', proxy("http://localhost:3001")); // Proxy events requests
app.use('/organiser', Organiserrouter); // Changed to lowercase 'organiser' for consistency

app.listen(PORT, () => {
    console.log(`API Gateway is running on port ${PORT}`);
});
