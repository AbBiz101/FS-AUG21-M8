import createHttpError from 'http-errors';
import UserModel from './schema.js';
import { JWTAuthenticatorForLogin } from '../../authentication/authenticator.js';
import passport from 'passport';


const createUser = async (req, res, next) => {
	try {
		const newUser = await new UserModel(req.body).save();
		delete newUser._doc.password;
		delete newUser._doc.__v;
		res.status(201).send(newUser);
	} catch (error) {
		next(createHttpError(401, 'can not creat user'));
	}
};

const login = async (req, res, next) => {
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
		next(error);
	}
};



/**************************************** USER *************************************************/

const getUser = async (req, res, next) => {
	try {
		console.log(req.user);
		res.status(200).send(req.user);
	} catch (error) {
		next(error);
	}
};

const editUser = async (req, res, next) => {
	try {
		const body = req.body;
		const oldUser = req.user;
		req.user = { ...req.user._doc, ...body };
		await req.user.save();
		console.log(req.user);
		res.send(req.user);
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
		// delete users._doc.password;
		// delete users._doc.__v;
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
	getAllUserAdmin,
	deleteUserAdmin,
};


export default endpoints;
