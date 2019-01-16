const TAG = '[MessageController]';

const Request = require('./../../common/services/Request');

function MessageController(req, res) {
  this.req = req;
  this.res = res;
  this.io = req.app.get('io');
};

MessageController.prototype.evaluateMessage = function(cb, result) {
  let ACTION = '[evaluateMessage]';

  let avatar = this.req.body.avatar;
  let user = this.req.body.user;
  let message = this.req.body.message;
  let room = this.req.body.room;

  let chat = {
    avatar: avatar,
    user: user,
    message: message,
    room: room
  };

  if(message.includes('play')) {  // testing purpose only, play must be determined via watson assistant
    let query = message.replace('play ', '');

    Request.setOptions({
      uri: process.env.YOUTUBE_API_URL + '/search?part=snippet&type=video&maxResults=5&q=' + query + '&key=' + process.env.YOUTUBE_API_KEY,
    }).get().then((data)=>{
      let resultMedia = JSON.parse(data.body).items;
      let media = [];
      resultMedia.forEach((resultMedium)=>{
        let medium = {
          id: resultMedium.id.videoId,
          title: resultMedium.snippet.title,
          url: 'https://www.youtube.com/watch?v=' + resultMedium.id.videoId ,
          video: 'https://www.youtube.com/embed/' + resultMedium.id.videoId + '?autoplay=1&enablejsapi=1&disablekb=1&fs=0&modestbranding=1&iv_load_policy=3',
        };
        media.push(medium);
      });
      chat.media = media;
      return cb(null, chat);  
    }).catch(error=>{
      this.io.emit('message', chat);
      return cb(error);  
    });
  } else {
    this.io.emit('message', chat);
    return cb(null, chat);  
  }
};

module.exports = MessageController;