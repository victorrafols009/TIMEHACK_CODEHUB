require('dotenv').config();
let express = require('express');

let bodyParser = require('body-parser'),
  DEFAULT_BODY_SIZE_LIMIT = 1024 * 1024 * 10,
  DEFAULT_PARAMETER_LIMIT = 10000;

let bodyParserJsonConfig = () => ({
  parameterLimit: DEFAULT_PARAMETER_LIMIT,
  limit: DEFAULT_BODY_SIZE_LIMIT
})

let app = express();
let ask = require('./services/controller').ask;

app.use(bodyParser.json(bodyParserJsonConfig()));

app.get('/', (req,res) => res.send('hello world!'))
app.post('/ask', ask)

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

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader(
      'Access-Control-Allow-Methods',
      'GET,HEAD,OPTIONS,POST,PUT,DELETE'
  );
  res.setHeader(
      'Access-Control-Allow-Headers',
      'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'
  );
  next();
});