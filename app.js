require('dotenv').config();
var Logger  = require('./modules/common/services/Logger');
// var Errors  = require('./modules/common/services/Errors');
// var path    = require('path')
var express = require('express');

var bodyParser = require('body-parser');

var app     = express();

var express_configuration = require("./express-configuration");
express_configuration.init(app, express);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api/v1/messages', require('./modules/message'));

var server = require('http').createServer(app);
var io     = require('socket.io')(server);

var port   = process.env.SERVER_PORT || 3000;
server.listen(port, function() {
	Logger.log('info', '[App] Now up and running', {port: port});
});

app.set('io', io);

let musicQueue = [
  // {
  //   videoId: 'IHNzOHi8sJs',
  //   currentTime: 0,
  //   progress: 0
  // },
  // {
  //   videoId: 'mAKsZ26SabQ',
  //   currentTime: 0,
  //   progress: 0
  // },
  // {
  //   videoId: 'J_CFBjAyPWE',
  //   currentTime: 0,
  //   progress: 0
  // },
  // {
  //   videoId: 'WyiIGEHQP8o',
  //   currentTime: 0,
  //   progress: 0
  // },
  // {
  //   videoId: 'Amq-qlqbjYA',
  //   currentTime: 0,
  //   progress: 0
  // }
];

app.set('musicQueue', musicQueue);

let connections = 0;
io.on('connection', (socket) => {
  console.log(musicQueue);
  connections = Object.keys(io.sockets.connected).length;
  Logger.log('info', '[Socket] User connected', {connections: connections});

  socket.on('disconnect', () => {
    connections = Object.keys(io.sockets.connected).length;
    io.emit('connections', connections);
    Logger.log('info', '[Socket] User disconnected', {connections: connections});
  })

  socket.on('music-queue', () => {
    io.emit('music-queue', musicQueue);
  });

  socket.on('playing', (data) => {
    // update progress of first music on queue
    if(musicQueue.length != 0) {
      musicQueue[0].progress = data.progress;
      musicQueue[0].currentTime = data.currentTime;
      io.emit('playing', musicQueue);  
    }
  });

  socket.on('play-next', () => {
    musicQueue.shift();
    console.log(musicQueue);
    io.emit('play-next', musicQueue);
  });  
});

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader(
      'Access-Control-Allow-Methods',
      'GET,HEAD,OPTIONS,POST,PUT,DELETE'
  );
  res.setHeader(
      'Access-Control-Allow-Headers',
      'Content-Type'
  );
  next();
});

module.exports = app;
