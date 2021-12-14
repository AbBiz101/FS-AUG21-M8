import express from 'express';
import endpoints from './router.js';

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

const usersRouter = express.Router();

usersRouter
	.route('/me')
	.get(getUser)
	.put(editUser)
	.post(createUser)
	.delete(deleteUser);

usersRouter
	.route('/:id')
	.get(getUserAdmin)
	.put(editUserAdmin)
	.post(createUserAdmin)
	.delete(deleteUserAdmin);

export default usersRouter;
