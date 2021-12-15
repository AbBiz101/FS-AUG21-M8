import express from 'express';
import endpoints from './router.js';
import postEndpoints from '../post/router.js';
import {
	basicAuthentication,
	adminAuthentication,
} from '../../authentication/authenticator.js';

const {
	getUser,
	editUser,
	createUser,
	deleteUser,
	getUserAdmin,
	editUserAdmin,
	getAllUserAdmin,
	deleteUserAdmin,
} = endpoints;

const {
	getPost,
	editPost,
	deletePost,
	createPost,
	getPostAdmin,
	editPostAdmin,
	deletePostAdmin,
} = postEndpoints;

const usersRouter = express.Router();

usersRouter
	.route('/')
	.post(createUser)
	.get(basicAuthentication, adminAuthentication, getAllUserAdmin);

/**************************************** USER *************************************************/
usersRouter
	.route('/me')
	.get(basicAuthentication, getUser)
	.put(basicAuthentication, editUser)
	.delete(basicAuthentication, deleteUser);
usersRouter
	.route('/me/post')
	.get(basicAuthentication, getPost)
	.put(basicAuthentication, editPost)
	.post(basicAuthentication, createPost)
	.delete(basicAuthentication, deletePost);

/**************************************** ADMIN *************************************************/
usersRouter
	.route('/:id')
	.get(basicAuthentication, adminAuthentication, getUserAdmin)
	.put(basicAuthentication, adminAuthentication, editUserAdmin)
	.delete(basicAuthentication, adminAuthentication, deleteUserAdmin);
usersRouter
	.route('/:id/post')
	.get(basicAuthentication, adminAuthentication, getPostAdmin)
	.put(basicAuthentication, adminAuthentication, editPostAdmin)
	.delete(basicAuthentication, adminAuthentication, deletePostAdmin);

export default usersRouter;
