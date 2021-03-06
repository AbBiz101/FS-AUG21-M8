import express from 'express';
import accomodationRouter from './accomodation/index';
import destinationRouter from './destination/index';
import {userRouter,hostRouter} from './users/index';
import listEndpoints from 'express-list-endpoints';

const app = express();

app.use(express.json());

app.get('/test', (req, res) => {
	res.send({ message: 'Test successful' });
});

app.use('/accomodation', accomodationRouter);
app.use('/destination', destinationRouter);
app.use('/user', userRouter);
app.use('/host', hostRouter);
console.table(listEndpoints(app));
export { app };
