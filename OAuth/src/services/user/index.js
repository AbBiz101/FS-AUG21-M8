import express from 'express';
import endpoints from './router.js';
import postEndpoints from '../post/router.js';
import {
	JWTAuthentication,
	adminAuthentication,
} from '../../authentication/authenticator.js';
import passport from 'passport';

const {
	login,
	getUser,
	editUser,
	createUser,
	deleteUser,
	getUserAdmin,
	editUserAdmin,
	getRefreshToken,
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

/**************************************** LOGIN/REGISTER *************************************************/
usersRouter.route('/register').post(createUser);
usersRouter.route('/refresh').post(getRefreshToken);
usersRouter.route('/login').post(login);

/**************************************** OAUTH *************************************************/

usersRouter.get(
	'/googleLogin',
	passport.authenticate('google', {
		scope: ['profile', 'email'],
	}),
);

usersRouter.get(
	'/googleRedirect',
	passport.authenticate('google'),
	async (req, res, next) => {
		try {
			console.log('TOKENS: ', req.user.tokens);

			res.redirect(`http://localhost:3001`);
			// res.redirect('http://localhost:3003/users/me');
		} catch (error) {
			next(error);
		}
	},
);

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
	.route('/')
	.get(JWTAuthentication, adminAuthentication, getAllUserAdmin);
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
