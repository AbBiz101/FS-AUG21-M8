import { UserSchema } from './schema';
import mongoose from 'mongoose';

export const UserModel = mongoose.model('user', UserSchema);
