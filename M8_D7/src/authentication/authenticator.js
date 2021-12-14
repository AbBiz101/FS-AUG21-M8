import atob from 'atob';
import createError from 'http-errors';
import UserModel from '../services/user/schema.js';

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
