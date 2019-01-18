const TAG = '[MessageController]';

const Request = require('./../../common/services/Request');
const watson = require('watson-developer-cloud');
const express = require('express');
const router = express.Router();

function MessageController(req, res) {
  this.req = req;
  this.res = res;
  this.io = req.app.get('io');
  this.musicQueue = req.app.get('musicQueue');
};

let context;
let text = '';
let assistant;
let dialog = '';
let query = '';

/**
 *
 * To queue, do this code:
 *
    this.musicQueue.push({
      videoId: message,
      currentTime: 0,
      progress: 0
    });
    this.io.emit('music-queue', this.musicQueue);

 */

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

  let $this = this;

  // launch watson chatbot
  if(message.includes('@chillbot') || ((context) && dialog == 'started')) {
    if(message.includes('@chillbot')) {
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

        if(text.startsWith('play ') || (context.song != null && context.singer != null)) {
          if(text.startsWith('play ')) {
            text.replace('play ', '');
            query = text;
          } else {
            let song = context.song;
            let singer = context.singer;
            query = song + '+' + singer;
          }

          dialog = '';
          context = null;
          assistant = null;
          text = '';

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

            $this.musicQueue.push({
              videoId: resultMedia[0].id.videoId,
              currentTime: 0,
              progress: 0
            });
            $this.io.emit('music-queue', $this.musicQueue);
            return cb(null, chat);
          }).catch(error=>{
            $this.io.emit('message', chat);
            return cb(error);
          });
        } else if(text == 'cancel') {
            dialog = '';
            context = null;
            assistant = null;
            text = '';

            return cb(null, chat);
        } else return cb(null, chat);
      }
    });

  } else {
    this.io.emit('message', chat);
    return cb(null, chat);
  }
};

module.exports = MessageController;
