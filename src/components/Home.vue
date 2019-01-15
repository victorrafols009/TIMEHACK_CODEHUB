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
          <chat v-for="(chat, index) in messages" :key="index" :chat="chat"/>
        </ul>
      </div>
      <form @submit.prevent="sendMessage">
        <div class="chat__input">
          <input type="text" v-model="message" placeholder="say something nice to @kiana">
        </div>
      </form>
      <!-- Will appear if User haven't selected a room yet -->
      <!-- <welcome/> -->
    </div>
  </div>
</template>

<script>
import Chat from "./Chats/Chat.vue";
import Sidebar from "./Sidebar/Sidebar.vue";
import Welcome from "./Welcome/Welcome.vue";
import Modal from "./Modal/Modal.vue";
import io from "socket.io-client";

export default {
  name: "Home",
  components: {
    Chat,
    Sidebar,
    Welcome,
    Modal
  },
  data() {
    return {
      roomInfo: {
        name: "Chilly ~ ",
        members: 10
      },
      modal:{
        isActive: false,
      },
      codename: this.$route.params.codename,
      user: "",
      message: "",
      messages: [],
      date: "",
      socket: io("localhost:3001")
    };
  },
  methods: {
    sendMessage(e) {
      e.preventDefault();

      this.socket.emit("SEND_MESSAGE", {
        user: this.codename,
        message: this.message
      });
      this.message = "";
    },
    showModal() {
      this.modal.isActive = true;
    },
    hideModal() {
      this.modal.isActive = false;
    }
  },
  mounted() {
    this.socket.on("MESSAGE", data => {
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

