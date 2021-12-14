import endpoints from './router';
import express from 'express';

const {
	getPost,
	editPost,
	deletePost,
	createPost,
	getPostAdmin,
	editPostAdmin,
	deletePostAdmin,
} = endpoints;

const postRouter = express.Router();

postRouter
	.route('/me')
	.get(getPost)
	.put(editPost)
	.post(createPost)
	.delete(deletePost);

postRouter
	.route('/:id')
	.get(getPostAdmin)
	.put(editPostAdmin)
	.delete(deletePostAdmin);

export default postRouter;
