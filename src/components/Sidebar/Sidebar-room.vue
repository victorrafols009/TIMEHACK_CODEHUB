<template>
  <li :class="room.status">
    <img :src="room.avatar">
    <p>{{room.name}}</p>
    <p>({{room.members}})</p>
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

