import express from 'express';
import { HandleLogin, HandleLogout, HandleSignup } from '../controllers/user.js';

const userRouter = express.Router(); // Use camel case

userRouter.post('/signup', HandleSignup);
userRouter.post('/login', HandleLogin);
userRouter.post('/logout', HandleLogout);

export default userRouter;
