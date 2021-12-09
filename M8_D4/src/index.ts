import { app } from './app';
import mongoose from 'mongoose';

const port: number = 3000;

console.log(process.env.MONGO_URL);

mongoose.connect(process.env.MONGO_URL!).then(() => {
	console.log(`Connected to Mongo`);
	app.listen(port, () => {
		console.log(`Server is running on port ${port}`);
	});
});
