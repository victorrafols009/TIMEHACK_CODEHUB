<template>
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
    <div class="chat__input">
      <input type="text" placeholder="say something nice to @kiana"/>
    </div>
  </div>
</template>

<script>
import Chat from './Chats/Chat.vue';
export default {
  name: "Home",
  components: {
    Chat,
  },
  data() {
    return {
      roomInfo:
        {
          name:'Chilly ~ ',
          members: 10,
        },
      messages: [
        {
          avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxyCupEcex8TQ972NCU17qPgMAJEsMt8c2ffXQVwytX2j_Gkjs',
          name: 'Kiana',
          msg: 'Hi captain',
          date: 'Today :7:04',
        },
        {
          avatar: 'https://pm1.narvii.com/6991/444e4ab9d55132405af1b5dbac03ed6341f1f245r1-641-429v2_hq.jpg',
          name: 'Captain',
          msg: 'No.',
          date: 'Today :7:04',
        },
        {
          avatar: 'https://images.discordapp.net/avatars/434737143395516416/a2b9761b4fd5af86af088200c6060b94.png?size=512',
          name: 'Ai-Chan',
          msg: 'HIiiiiiiiiiiiiiiiiiiiii!!!!',
          date: 'Today :7:05',
        },
        {
          avatar: 'https://images.discordapp.net/avatars/434737143395516416/a2b9761b4fd5af86af088200c6060b94.png?size=512',
          name: 'Ai-Chan',
          msg: 'You guys wanna roll on the new gatcha ?',
          date: 'Today :7:05',
        },

      ]
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
