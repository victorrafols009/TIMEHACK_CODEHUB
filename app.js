var Logger  = require('./modules/common/services/Logger');
// var Errors  = require('./modules/common/services/Errors');
// var path    = require('path')
var express = require('express');
var app     = express();

require('dotenv').config();

var express_configuration = require("./express-configuration");
express_configuration.init(app, express);

app.use('/api/v1/messages', require('./modules/message'));

var server = require('http').createServer(app);
var io     = require('socket.io')(server);

var port   = process.env.SERVER_PORT || 3000;
server.listen(port, function() {
	Logger.log('info', '[App] Now up and running', {port: port});
});

app.set('io', io);

let connections = 0;
io.on('connection', (socket) => {
  connections = Object.keys(io.sockets.connected).length;
  Logger.log('info', '[Socket] User connected', {connections: connections});

  socket.on('disconnect', () => {
    connections = Object.keys(io.sockets.connected).length;
    io.emit('connections', connections);
    Logger.log('info', '[Socket] User disconnected', {connections: connections});
  })
});

module.exports = app;
