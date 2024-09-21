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
app.use('/api/events', proxy("http://localhost:3001")); 
app.use('api/booking', proxy("http://localhost:3002"));

app.listen(PORT, () => {
    console.log(`API Gateway is running on port ${PORT}`);
});
