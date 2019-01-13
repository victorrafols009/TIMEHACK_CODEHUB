<template>
<div id="chat-screen" class="flex">
  <Sidebar/>
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
        <chat v-for="(chat, index) in messages" :key="index" :chat="chat"/>
      </ul>
    </div>
    <form @submit.prevent="sendMessage">
      <div class="chat__input">
        <input type="text" v-model="message" placeholder="say something nice to @kiana"/>
      </div>
    </form>
  </div>
</div>
</template>

<script>
import Chat from './Chats/Chat.vue';
import Sidebar from './Sidebar/Sidebar.vue'
import io from 'socket.io-client';

export default {
  name: "Home",
  components: {
    Chat,
    Sidebar
  },
  beforeCreate(){
    // let isLogged = this.codename
    // if(!isLogged == ""){
    //   this.$router.push('Login') 
    // }
  },
  data() {
    return {
      roomInfo: {
        name:'Chilly ~ ',
        members: 10,
      },
      avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxyCupEcex8TQ972NCU17qPgMAJEsMt8c2ffXQVwytX2j_Gkjs',
      codename: this.$route.params.codename,
      user: '',
      message: '',
      messages: [],
      date: '',
      socket : io('localhost:3001')
    }
  },
   methods: {
    sendMessage(e) {
      e.preventDefault();
      
      this.socket.emit('SEND_MESSAGE', {
          avatar: this.avatar,
          user: this.codename,
          message: this.message
      });
      this.message = ''
    }
  },
  mounted() {
    this.socket.on('MESSAGE', (data) => {
      this.messages = [...this.messages, data];
      // you can also do this.messages.push(data)
    });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#chat-screen {
  height: 100vh;
}

.btn-hidden {
  display: none;
}
</style>
