import express from 'express';
import { Server, Socket } from 'socket.io';
import { createServer } from 'http';

// config express app
const app = express();

// create instance of standard http server based on express config
const http = createServer(app);

// creat io server based on the http server
const io = new Server(http, {});

// defining event handler
io.on('connection', (socket) => {
	console.log(socket.id);

	// this will print on FE
	socket.emit('txt', { message: 'new text' });
	// this happened on the BE socket.on('txt', (data) => {console.log(data)})

	//this will print whatever comes from the FE
	socket.on('xxxx', (data) => {
		console.log(data);
	});
	//this happened on the FE socket.emit('xxxx', { message: 'new text' });

	socket.on('disconnect', () => {
		console.log(`${socket.id} disconnect.`);
	});
});

// start the http server not the express app coz it would initialize
// and start another instance of http server which dont include io config
http.listen(3030, () => {
	console.log('Listening on 3030');
});
