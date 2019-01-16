const TAG = '[MessageController]';

const Request = require('./../../common/services/Request');
const watson = require('watson-developer-cloud');
const express = require('express');
const router = express.Router();

function MessageController(req, res) {
  this.req = req;
  this.res = res;
  this.io = req.app.get('io');
};

let context;
let text = '';
let assistant;
let dialog = '';

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

  let watsonResponse = [];

  // launch watson chatbot
  if(message.includes('@watson') || ((context) && dialog == 'started')) {
    if(message.includes('@watson')) {
      //setup the assistant config
      assistant = new watson.AssistantV1({
        version: process.env.W_VER,
        iam_apikey: process.env.W_KEY,
        url: process.env.W_URL,

        //To prevent IBM usage of your data for an API request, set the X-Watson-Learning-Opt-Out header parameter to true.
        headers: {
          'X-Watson-Learning-Opt-Out': 'true'
        }
      });

      dialog = 'started';
    }

    if(context) {
      text = message;
    }

    assistant.message({
      workspace_id: process.env.W_WKID, //workspace = skills
      input: {
        text: text
      },
      context: context
    },  function(err, response) {
      if (err){
        return cb(null, err);
      }else{
        let resultWatsonResponse = {
          text: response.output.generic[0].text,
          context: response.context
        };

        context = resultWatsonResponse.context;

        watsonResponse.push(resultWatsonResponse);
        chat.watson = watsonResponse;

        if(context.song != null && context.singer != null) {
          let song = context.song;
          let singer = context.singer;

          dialog = '';
          context = null;
          assistant = null;

          let query = song + '+' + singer;

          Request.setOptions({
            uri: process.env.YOUTUBE_API_URL + '/search?part=snippet&type=video&maxResults=5&q=' + query + '&key=' + process.env.YOUTUBE_API_KEY,
          }).get().then((data)=>{
            let resultMedia = JSON.parse(data.body).items;
            let media = [];
            resultMedia.forEach((resultMedium)=>{
              let medium = {
                id: resultMedium.id.videoId,
                title: resultMedium.snippet.title,
                url: 'https://www.youtube.com/watch?v=' + resultMedium.id.videoId
              };
              media.push(medium);
            });
            chat.media = media;
            return cb(null, chat);
          }).catch(error=>{
            this.io.emit('message', chat);
            return cb(error);
          });
        } else return cb(null, chat);
      }
    });

  } else {
    this.io.emit('message', chat);
    return cb(null, chat);
  }
};

module.exports = MessageController;
