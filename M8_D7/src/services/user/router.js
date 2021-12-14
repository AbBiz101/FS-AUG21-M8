import { basicAuthentication } from '../../authentication/authenticator.js';
import createHttpError from 'http-errors';
import UserModel from './schema.js';

const getUser = async (req, res, next) => {
	try {
	} catch (error) {
		next(error);
	}
};

const createUser = async (req, res, next) => {
	try {
	} catch (error) {
		next(error);
	}
};

const editUser = async (req, res, next) => {
	try {
	} catch (error) {
		next(error);
	}
};

const deleteUser = async (req, res, next) => {
	try {
	} catch (error) {
		next(error);
	}
};

const getUserAdmin = async (req, res, next) => {
	try {
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
