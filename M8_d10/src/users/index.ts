import express from 'express';
import { UserModel } from './model';
import createHttpError from 'http-errors';
import {
	adminAuthentication,
	JWTAuthentication,
	JWTAuthenticatorForLogin,
} from '../authentication/authentication.js';

const userRouter = express.Router();

const hostRouter = express.Router();

userRouter.post('/register', async (req, res, next) => {
	try {
		const newUser = await new UserModel(req.body).save();
		res.status(201).send(newUser);
	} catch (error) {
		console.log(error);
	}
});

userRouter.post('/login', async (req, res, next) => {
	try {
		const { email, password } = req.body;
		const user = await UserModel.checkCredentials(email, password);
		if (user) {
			const loginToken = await JWTAuthenticatorForLogin(user);
			res.send({ loginToken });
		} else {
			next(createHttpError(401, 'User not found'));
		}
	} catch (error) {
		console.log(error);
	}
});

userRouter.get('/me', JWTAuthentication, async (req, res, next) => {
	try {
	} catch (error) {
		console.log(error);
	}
});

userRouter.get('/accommodation', JWTAuthentication, async (req, res, next) => {
	try {
	} catch (error) {
		console.log(error);
	}
});

userRouter.get(
	'/accommodation/:id',
	JWTAuthentication,
	async (req, res, next) => {
		try {
		} catch (error) {
			console.log(error);
		}
	},
);

/****************************************** HOST ***********************************************/

hostRouter.get(
	'/accommodation',
	JWTAuthentication,
	adminAuthentication,
	async (req, res, next) => {
		try {
		} catch (error) {
			next(error);
		}
	},
);

hostRouter.get(
	'/user/me/accommodation',
	JWTAuthentication,
	adminAuthentication,
	async (req, res, next) => {
		try {
		} catch (error) {
			next(error);
		}
	},
);

hostRouter.post(
	'/accommodation',
	JWTAuthentication,
	adminAuthentication,
	async (req, res, next) => {
		try {
		} catch (error) {
			next(error);
		}
	},
);

hostRouter.put(
	'/accommodation/:id',
	JWTAuthentication,
	adminAuthentication,
	async (req, res, next) => {
		try {
		} catch (error) {
			next(error);
		}
	},
);

hostRouter.delete(
	'/accommodation/:id',
	JWTAuthentication,
	adminAuthentication,
	async (req, res, next) => {
		try {
		} catch (error) {
			next(error);
		}
	},
);

export { userRouter, hostRouter };
