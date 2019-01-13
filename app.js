let express = require('express');
let app = express();

server = app.listen(3001, ()=>{
    console.log('server is running on port 3001')
});

let io = require('socket.io')(server);

io.on('connection', (socket)=> {
  console.log(socket.id)
  socket.on('SEND_MESSAGE', (data)=> {
    io.emit('MESSAGE', data)
  });
});