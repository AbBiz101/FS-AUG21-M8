import atob from 'atob';
import createError from 'http-errors';
import UserModel from '../services/user/schema.js';
import { JWTverifier, JWTTokenGenerator } from './token.js';

export const basicAuthentication = async (req, res, next) => {
	if (!req.headers.authorization) {
		next(createError(401, 'Credentials in Authorization header is missing.'));
	} else {
		const base64 = req.headers.authorization.split(' ')[1];
		const decodedBase64 = atob(base64);
		const [email, password] = decodedBase64.split(':');
		const user = await UserModel.checkCredentials(email, password);
		if (user) {
			req.user = user;
			next();
		} else {
			next(createError(401, 'User name or password is incorrect.'));
		}
	}
};

export const adminAuthentication = async (req, res, next) => {
	if (!req.user.role === 'ADMIN') {
		console.log(2222);
		next(createError(403, 'Authorized admin only.'));
	} else {
		next();
	}
};

export const JWTAuthentication = async (req, res, next) => {
	if (req.headers.authorization) {
		try {
			//get the token
			const token = req.headers.authorization.replace('Bearer ', '');
			//using the function from tools verify the token with the Signature
			const decodedToken = await JWTverifier(token);
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

export const JWTAuthenticatorForLogin = async (user) => {
	const accessToken = await JWTTokenGenerator({ _id: user._id });
	return accessToken;
};
