import createHttpError from 'http-errors';
import PostModel from './schema.js';


/**************************************** USER *************************************************/


const getPost = async (req, res, next) => {
	try {
	} catch (error) {
		next(error);
	}
};

const createPost = async (req, res, next) => {
	try {
	} catch (error) {
		next(error);
	}
};

const editPost = async (req, res, next) => {
	try {
	} catch (error) {
		next(error);
	}
};

const deletePost = async (req, res, next) => {
	try {
	} catch (error) {
		next(error);
	}
};


/**************************************** ADMIN *************************************************/

const getPostAdmin = async (req, res, next) => {
	try {
	} catch (error) {
		next(error);
	}
};

const editPostAdmin = async (req, res, next) => {
	try {
	} catch (error) {
		next(error);
	}
};

const deletePostAdmin = async (req, res, next) => {
	try {
	} catch (error) {
		next(error);
	}
};

const postEndpoints = {
	getPost,
	createPost,
	editPost,
	deletePost,
	getPostAdmin,
	editPostAdmin,
	deletePostAdmin,
};

export default postEndpoints;
