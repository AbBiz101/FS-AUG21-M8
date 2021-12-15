import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const { Schema, model } = mongoose;

const UserSchema = new Schema(
	{
		firstName: { type: String, required: true },
		lastName: { type: String, required: true },
		avatar: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		role: { type: String, default: 'USER' },
		post: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
	},
	{ timestamps: true },
);

UserSchema.pre('save', async function (next) {
	const user = this;
	const password = user.password;
	if (user.isModified('password')) {
		const hashed = await bcrypt.hash(password, 10);
		user.password = hashed;
	}
	next();
});

UserSchema.method.toJSON = function () {
	const user = this;
	const userObj = user.toObject();
	delete userObj._doc.password;
	delete userObj._doc.__v;
	return userObj;
};

UserSchema.statics.checkCredentials = async function (email, passWord) {
	const user = await this.findOne({ email });
	if (user) {
		const matchedUser = await bcrypt.compare(passWord, user.password);
		if (matchedUser) {
			return user;
		} else {
			return null;
		}
	} else {
		return null;
	}
};

export default model('User', UserSchema);
