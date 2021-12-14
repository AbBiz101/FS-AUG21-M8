import { basicAuthentication } from '../../authentication/authenticator.js';
import createHttpError from 'http-errors';
import UserModel from './schema.js';

const getUser = async (req, res, next) => {
	try {
		res.status(200).send(req.user);
	} catch (error) {
		next(error);
	}
};

const createUser = async (req, res, next) => {
	console.log(req.body);
	try {
		const newUser = new UserModel(req.body);
		const { _id } = await newUser.save();
		res.status(201).send({ _id });
	} catch (error) {
		next(createHttpError(401, 'can not creat user'));
	}
};

const editUser = async (req, res, next) => {
	try {
		const body = req.body;
		const oldUser = req.user;
		req.user = { ...oldUser, ...body };
		await req.user.save();
		res.send();
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

const getUserAdmin = async (req, res, next) => {
	try {
		const user = await UserModel.findById(req.params.id);
		res.send(user);
	} catch (error) {
		next(error);
	}
};

const createUserAdmin = async (req, res, next) => {
	try {
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
	getUser,
	createUser,
	editUser,
	deleteUser,
	getUserAdmin,
	createUserAdmin,
	editUserAdmin,
	deleteUserAdmin,
};

export default endpoints;
