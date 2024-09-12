import express from 'express';
import { Connection } from './connection.js';
import  userRouter from './routes/user.js';
import { configDotenv } from 'dotenv';
configDotenv();
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';



const app=express();
const PORT=process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(cors());
app.use(express.urlencoded({extended: true}));
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});

Connection();

app.use('/user',userRouter);