<template>
  <li :class="room.status">
    <!-- <img
      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxyCupEcex8TQ972NCU17qPgMAJEsMt8c2ffXQVwytX2j_Gkjs"
    > -->
    <img :src="room.avatar">
    <p>{{room.name}}</p>
    <p>({{room.members}})</p>
    <!-- <div class="status active"/> -->
  </li>
</template>

<script>
export default {
  props:
  {
    room: Object,
  }
}
</script>

