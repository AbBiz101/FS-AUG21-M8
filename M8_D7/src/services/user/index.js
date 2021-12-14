import express from 'express';
import endpoints from './router.js';
import postEndpoints from '../post/router.js';
import { basicAuthentication } from '../../authentication/authenticator.js';

const {
	getUser,
	editUser,
	createUser,
	deleteUser,
	getUserAdmin,
	editUserAdmin,
	createUserAdmin,
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

usersRouter.route('/').post(createUser);

usersRouter
	.route('/me', basicAuthentication)
	.get(getUser)
	.put(editUser)
	.delete(deleteUser);

usersRouter
	.route('/me/post', basicAuthentication)
	.get(getPost)
	.put(editPost)
	.post(createPost)
	.delete(deletePost);

usersRouter
	.route('/:id')
	.get(getUserAdmin)
	.put(editUserAdmin)
	.post(createUserAdmin)
	.delete(deleteUserAdmin);

usersRouter
	.route('/:id/post')
	.get(getPostAdmin)
	.put(editPostAdmin)
	.delete(deletePostAdmin);

export default usersRouter;
