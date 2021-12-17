import express from 'express';
import endpoints from './router.js';
import postEndpoints from '../post/router.js';
import {
	JWTAuthentication,
	adminAuthentication,
	basicAuthentication,
} from '../../authentication/authenticator.js';

const {
	login,
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

usersRouter.route('/register').post(createUser);
usersRouter.route('/login').post(login);
usersRouter.route('/login').post(login);

usersRouter
	.route('/')
	.get(JWTAuthentication, adminAuthentication, getAllUserAdmin);

/**************************************** USER *************************************************/
usersRouter
	.route('/me')
	.get(JWTAuthentication, getUser)
	.put(JWTAuthentication, editUser)
	.delete(JWTAuthentication, deleteUser);
usersRouter
	.route('/me/post')
	.get(JWTAuthentication, getPost)
	.put(JWTAuthentication, editPost)
	.post(JWTAuthentication, createPost)
	.delete(JWTAuthentication, deletePost);

/**************************************** ADMIN *************************************************/
usersRouter
	.route('/:id')
	.get(JWTAuthentication, adminAuthentication, getUserAdmin)
	.put(JWTAuthentication, adminAuthentication, editUserAdmin)
	.delete(JWTAuthentication, adminAuthentication, deleteUserAdmin);
usersRouter
	.route('/:id/post')
	.get(JWTAuthentication, adminAuthentication, getPostAdmin)
	.put(JWTAuthentication, adminAuthentication, editPostAdmin)
	.delete(JWTAuthentication, adminAuthentication, deletePostAdmin);

export default usersRouter;
