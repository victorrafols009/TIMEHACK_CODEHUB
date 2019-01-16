<template>
  <div id="chat-screen" class="flex">
    <!-- Will appear if Loading -->
    <!-- <div class="loading loading__body">
      <span class="spinner atom"></span>
      <p>Loading please wait . . . </p>
    </div> -->
    <modal @hideModal="hideModal" :class="{'modal__active' : modal.isActive}">
      <div slot="header">
        <p><i class="far fa-sad-tear"></i></p>
      </div>
      <div class="text-center" slot="body">
        <h1>Logout?</h1>
        <p class="regular-text font__gray"> Are you sure you want to leave?</p>
        <p class="small-text font__gray">( We'll miss you)</p>
      </div>
    </modal>
    <Sidebar @showModal="showModal" />
    <div class="Home chat">
      <div class="chat__header">
        <p>{{roomInfo.name}}</p>
        <p>({{roomInfo.members}})</p>
        <div class="status active"/>
      </div>
      <div class="chat__body">
        <div class="chat__start">
          <div class="circle-1"/>
          <div class="circle-2"/>
          <div class="circle-3"/>
          <p>It all started here ~</p>
        </div>
        <ul>
          <chat id="chats" v-for="(chat, index) in messages" :key="index" :chat="chat"/>
        </ul>
      </div>
      <form @submit.prevent="sendMessage">
        <div class="chat__input">
          <input type="text" v-model="message" placeholder="say something nice to" autofocus>
        </div>
      </form>
      <!-- Will appear if User haven't selected a room yet -->
      <!-- <welcome/> -->
    </div>
  </div>
</template>

<script>

import io from 'socket.io-client';
import axios from 'axios';
import Chat from './Chats/Chat.vue';
import Sidebar from './Sidebar/Sidebar.vue'
import Welcome from "./Welcome/Welcome.vue";
import Modal from "./Modal/Modal.vue";

export default {
  name: "Home",
  components: {
    Chat,
    Sidebar,
    Welcome,
    Modal
  },
  beforeCreate(){

  },
  data() {
    return {
      socket : io(process.env.API_URL),
      roomInfo: {
        name: "Chilly ~ ",
        members: 10
      },
      modal:{
        isActive: false,
      },
      avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxyCupEcex8TQ972NCU17qPgMAJEsMt8c2ffXQVwytX2j_Gkjs',
      codename: this.$route.params.codename,
      user: "",
      message: "",
      messages: [],
      date: '',
    }
  },
  methods: {
    sendMessage(e) {
      e.preventDefault();
      let data = {
        avatar: this.avatar,
        user: this.codename,
        message: this.message,
        room: 'public'
      };
      axios.post(process.env.API_URL + '/ask', data)
        .then((response)=>{
          console.log(response)
        }).catch((err) => {
          console.log('Categories Error', err);
        });
      axios.post('/api/v1/messages', data)
        .then((response)=>{
          if(response.data.media) {
            this.messages = [...this.messages, response.data]; // show user's chat to itself only when talking to bot

            let media = response.data.media;
            let data = {
              avatar: require('../assets/chilly-ring.svg'), // bot avatar
              user: 'bot',
              message: `Now Playing: ${media[0].title} (${media[0].url})`,
              room: 'public',
              video: `${media[0].video}`
            }
            this.messages = [...this.messages, data]; // let bot talk
          } else if(response.data.watson) {
            this.messages = [...this.messages, response.data]; // show user's chat to itself only when talking to bot

            let watson = response.data.watson;
            let data = {
              avatar: '', // bot avatar
              user: 'Watson',
              message: `${watson[0].text}`,
              room: 'public'
            }

            this.messages = [...this.messages, data]; // let bot talk
          }
        })
        .catch((errors)=>{
          console.log(errors);
          let data = {
            avatar: '', // bot avatar
            user: 'bot',
            message: "I'm sorry, something went wrong from our side. Can you please try again?",
            room: 'public'
          }
          this.messages = [...this.messages, data];
        });
      this.message = ''
    },
    showModal() {
      this.modal.isActive = true;
    },
    hideModal() {
      this.modal.isActive = false;
    },
  },
  mounted() {
    this.socket.on('message', (data) => {
      this.messages = [...this.messages, data];
      // you can also do this.messages.push(data)
    });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
#chat-screen {
  height: 100vh;
}

.btn-hidden {
  display: none;
}
</style>
