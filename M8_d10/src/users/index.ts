import express from 'express';
import { UserModel } from './model';

const userRouter = express.Router();

userRouter.post('/register', async (req, res, next) => { });

userRouter.post('/login', async (req, res, next) => { });

userRouter.get('/me', async (req, res, next) => { });

userRouter.get('/accommodation', async (req, res, next) => { });

userRouter.get('/accommodation/:id', async (req, res, next) => {});

export default userRouter;
