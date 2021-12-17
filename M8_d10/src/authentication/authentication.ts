import atob from 'atob';
import UserModel from '../users/schema.js';
import { JWTverifier, JWTTokenGenerator } from './token.js';
import { Request, Response, NextFunction } from 'express';
import createError from 'http-errors';

interface IUsers {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	role: string;
	_id: string;
}

declare global {
	namespace Express {
		interface Request {
			user?: IUsers;
		}
	}
}

let user: IUsers;

let token: {};

export const adminAuthentication = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	let val = req.user!.role === 'HOST' ? 'True' : 'False';
	if (val) {
		next(createError(403, 'Authorized admin only.'));
	} else {
		next();
	}
};

export const JWTAuthentication = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	if (req.headers.authorization) {
		try {
			const token = req.headers.authorization.replace('Bearer ', '');
			const decodedToken: any = await JWTverifier(token);
			const user = await UserModel.findById(decodedToken._id);
			if (user) {
				req.user = user;
				next();
			} else {
				next(createError(401, 'User dose not exist'));
			}
		} catch (error) {
			next(createError(401, 'Token not valid!'));
		}
	} else {
		next(createError(401, 'Please provide a token.'));
	}
};

export const JWTAuthenticatorForLogin = async (user: IUsers) => {
	const accessToken = await JWTTokenGenerator({ _id: user._id });
	return accessToken;
};
