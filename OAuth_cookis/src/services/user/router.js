import UserModel from './schema.js';
import createHttpError from 'http-errors';
import {
	JWTAuthenticatorForLogin,
	verifyRefreshTokenAndNewTokens,
} from '../../authentication/authenticator.js';
import passport from 'passport';

const createUser = async (req, res, next) => {
	try {
		const newUser = await new UserModel(req.body).save();
		delete newUser._doc.password;
		delete newUser._doc.__v;
		res.status(201).send(newUser);
	} catch (error) {
		console.log(error);
	}
};

const login = async (req, res, next) => {
	try {
		console.log(req.body);
		const { email, password } = req.body;
		const user = await UserModel.checkCredentials(email, password);
		if (user) {
			const { accessToken, refreshToken } = await JWTAuthenticatorForLogin(
				user,
			);
			res.send({ refreshToken, accessToken });
		} else {
			next(createHttpError(401, 'User not found'));
		}
	} catch (error) {
		next(error);
	}
};

/**************************************** REFRESH TOKEN *************************************************/
const getRefreshToken = async (req, res, next) => {
	try {
		const { currentRefreshToken } = req.body;
		const { accessToken, refreshToken } = await verifyRefreshTokenAndNewTokens(
			currentRefreshToken,
		);
		res.send({ refreshToken, accessToken });
	} catch (error) {
		next(createHttpError(401, 'User not found'));
	}
};

/**************************************** OAUTH *************************************************/

// const googleRedirect = async (req, res, next) => {
// 	try {
// 		res.redirect('http://localhost:3000');
// 	} catch (error) {
// 		next(error);
// 	}
// };

/**************************************** USER *************************************************/
const getUser = async (req, res, next) => {
	try {
		res.status(200).send(req.user);
	} catch (error) {
		next(error);
	}
};

const editUser = async (req, res, next) => {
	try {
		req.user = { ...req.user._doc, ...req.body };
		console.log(111, req.user);
		await user.save();
		res.send(user);
	} catch (error) {
		next(error);
	}
};

const deleteUser = async (req, res, next) => {
	try {
		await req.user.deleteOne();
		res.status(204).send();
	} catch (error) {
		next(error);
	}
};

/**************************************** ADMIN *************************************************/
const getAllUserAdmin = async (req, res, next) => {
	try {
		const users = await UserModel.find();
		res.status(200).send(users);
	} catch (error) {
		next(error);
	}
};

const getUserAdmin = async (req, res, next) => {
	try {
		const user = await UserModel.findById(req.params.id);
		delete users._doc.password;
		delete users._doc.__v;
		res.send(user);
	} catch (error) {
		next(error);
	}
};

const editUserAdmin = async (req, res, next) => {
	try {
	} catch (error) {
		next(error);
	}
};

const deleteUserAdmin = async (req, res, next) => {
	try {
		await req.user.findByIdAndDelete();
		res.status(204).send();
	} catch (error) {
		next(error);
	}
};

const endpoints = {
	login,
	getUser,
	editUser,
	deleteUser,
	createUser,
	getUserAdmin,
	editUserAdmin,
	getRefreshToken,
	getAllUserAdmin,
	deleteUserAdmin,
};

export default endpoints;

// http://localhost:3003/users/googleRedirect
