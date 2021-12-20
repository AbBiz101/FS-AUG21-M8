import cors from 'cors';
import express from 'express';
import passport from 'passport';
import mongoose from 'mongoose';
import { errorHandler } from './errorHandler.js';
import usersRouter from './services/user/index.js';
import listEndpoints from 'express-list-endpoints';
import googleOAuth from './authentication/oauth.js';

const server = express();

const whitelist = [process.env.FE_LOCAL_URL, process.env.FE_PROD_URL];

const corsOpt = {
	origin: function (origin, next) {
		if (!origin || whitelist.indexOf(origin) !== -1) {
			next(null, true);
		} else {
			next(new Error(404, 'CORS ERROR'));
		}
	},
};

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
