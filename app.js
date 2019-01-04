let app = require('express')();
let http = require('http').Server(app);
let io = require('socket.io')(http);

let Logger = require('./services/Logger');

require('dotenv').config();

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

let port = process.env.PORT || 8080;
http.listen(port, () => {
	Logger.log('info', '[App] Now up and running', {port: port});
});

let connections = 0;
io.on('connection', (socket) => {
  connections = Object.keys(io.sockets.connected).length;
  io.emit('connections', connections);
  Logger.log('info', '[Socket] User connected', {connections: connections});
  
  socket.on('disconnect', () => {
    connections = Object.keys(io.sockets.connected).length;
    io.emit('connections', connections);
    Logger.log('info', '[Socket] User disconnected', {connections: connections});
  })

  socket.on('new-message', (data) => {
    socket.broadcast.emit('new-message', data);
  });

  socket.on('typing', (data) => {
    socket.broadcast.emit('typing', data);
  });

  socket.on('typing-stop', (data) => {
    socket.broadcast.emit('typing-stop', data);
  });

  socket.on('user-joined', (data) => {
    socket.broadcast.emit('user-joined', data);
  });

  socket.on('user-left', (data) => {
    socket.broadcast.emit('user-left', data);
  });

});