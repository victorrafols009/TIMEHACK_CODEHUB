const TAG = '[message]'
const express = require('express');
const async = require('async');
const router = express.Router();
const Logger = require('./../common/services/Logger')
const MessageController = require('./controllers/MessageController');

router.post('/', function(req, res, next) {
  var ACTION = '[send]';
  Logger.log('debug', TAG + ACTION + ' request body', req.body);

  var _message = new MessageController(req);
  async.auto({
    evaluateMessage:		_message.evaluateMessage.bind(_message)
  }, function(err, result) {
    if (err) return res.error(err);
    else return res.ok(result.evaluateMessage);          
  });
});

module.exports = router;