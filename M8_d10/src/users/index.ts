import express from 'express';
import { UserModel } from './model';
import {
	adminAuthentication,
	JWTAuthentication,
	JWTAuthenticatorForLogin,
} from '../authentication/authentication.js';

const userRouter = express.Router();

userRouter.post('/register', async (req, res, next) => {
	try {
		const newUser = await new UserModel(req.body).save();
		delete newUser._doc.password;
		delete newUser._doc.__v;
		res.status(201).send(newUser);
	} catch (error) {
		console.log(error);
	}
});

userRouter.post('/login', async (req, res, next) => {
	try {
		const { email, password } = req.body;
		const user = await UserModel.checkCredentials(email, password);
	} catch (error) {
		console.log(error);
	}
});

userRouter.get('/me', async (req, res, next) => {
	try {
	} catch (error) {
		console.log(error);
	}
});

userRouter.get('/accommodation', async (req, res, next) => {
	try {
	} catch (error) {
		console.log(error);
	}
});

userRouter.get('/accommodation/:id', async (req, res, next) => {
	try {
	} catch (error) {
		console.log(error);
	}
});

export default userRouter;
