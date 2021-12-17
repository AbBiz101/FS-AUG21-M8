import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import { errorHandler } from './errorHandler.js';
import usersRouter from './services/user/index.js';
import listEndpoints from 'express-list-endpoints';
import passport from 'passport';
import { googleOAuth } from './authentication/authenticator.js';


const server = express();

server.use(cors());
server.use(express.json());


passport.use('google', googleOAuth);
server.use(passport.initialize());

server.use('/users', usersRouter);

server.use(errorHandler);

console.table(listEndpoints(server));

const port = process.env.PORT || 3004;

mongoose.connect(process.env.MONGO_CONNECTION);
mongoose.connection.on('connected', () => {
	console.log('Mongo Connected!');
	server.listen(port, () => {
		console.log(`Server running on port ${port}`);
	});
});
