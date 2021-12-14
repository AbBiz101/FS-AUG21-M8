import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import listEndpoints from 'express-list-endpoints';
import usersRouter from './services/user/index.js';
// import postRouter from './services/post/index.js';
import {errorHandler} from './errorHandler.js';

const server = express();

server.use(cors());
server.use(express.json());

server.use('/users', usersRouter);
server.use('/post', usersRouter);

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
