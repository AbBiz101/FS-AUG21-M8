import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import { errorHandler } from './errorHandler.js';
import usersRouter from './services/user/index.js';
import listEndpoints from 'express-list-endpoints';


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

server.use(cors(corsOpt));
server.use(express.json());


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

// import bcrypt from 'bcrypt';
// const x = 'abc';

// const y = bcrypt.hashSync(x, 12);
// const z = bcrypt.hashSync(x, 12);

// const isOk= bcrypt.compareSync(x,y)
// const isOk1= bcrypt.compareSync(x,z)
// const isOk3= bcrypt.compareSync(y,z)
// const isOk2 = bcrypt.compareSync(
// 	'$2b$13$f6tFomIGQmVAa8PTSak4ne8P/9BIY4ZCW3SeYqGUlVcuGl/BL3/7.',
// 	' $2b$12$OZR7Q2T6qjKKiQIZh8DG2.wWiETUuA5zIzy9ss3Te4EcXq6dFSC86',
// );
// console.log(isOk, isOk1, isOk2, isOk3); 
// console.log(z, y); 

