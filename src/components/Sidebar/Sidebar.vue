<template>
  <div class="sidebar">
    <div class="sidebar__header">
      <button @click="$emit('showModal')">
        <i class="fa fa-sign-out-alt"></i>
        <p class="tool-tip">Signout</p>
      </button>
      <p>Room lists</p>
      <button>
        <i class="fa fa-plus"></i>
        <p class="tool-tip">Create Room</p>
      </button>
    </div>
    <div class="sidebar__body">
      <ul>
        <room v-for="(room, index) in rooms" :key="index" :room="room"/>
      </ul>
    </div>
  </div>
</template>

<script>
import Room from "./Sidebar-room.vue";
export default {
  name: "Sidebar",
  components: {
    Room
  },
  data() {
    return {
      rooms: [
        {
          name: "Chilly ~ ",
          avatar:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxyCupEcex8TQ972NCU17qPgMAJEsMt8c2ffXQVwytX2j_Gkjs",
          members: 10,
          status: "active"
        },
        {
          name: "Get your Code on!",
          avatar:
            "https://scontent-atl3-1.cdninstagram.com/vp/47869b9d51b50f9b09c93862123269ad/5C92BE13/t51.2885-15/e35/44505509_567583567019091_50459621585362559_n.jpg",
          members: 5
        }
      ]
    };
  }
};
</script>
<style lang="scss" scoped>
</style>

