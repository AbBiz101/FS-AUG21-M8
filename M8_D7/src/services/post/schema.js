import mongoose from 'mongoose';
import UserModel from '../user/schema.js';

const { Schema, model } = mongoose;

const PostSchema = new Schema(
	{
		category: { type: String, required: true },
		title: { type: String, required: true },
		cover: { type: String, required: true },
		content: { type: String, required: true },
		readTime: {
			value: { type: Number, required: true },
			unit: { type: String, required: true },
		},
		author: { type: Schema.Types.ObjectId, ref: 'User' },
	},
	{ timestamps: true },
);

export default model('Post', PostSchema);
