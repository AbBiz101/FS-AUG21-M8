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
	console.log(Socket.id);

	socket.on('disconnect', () => {
		console.log(`${socket.id} disconnect.`);
	});
});

// start the http server not the express app coz it would initialize
// and start another instance of http server which dont include io config
http.listen(3030, () => {
    console.log('Listening on 3030')
});
