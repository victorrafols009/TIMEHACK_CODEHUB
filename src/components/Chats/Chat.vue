<template>
  <li class="chat__body-incoming">
    <!-- <img
      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxyCupEcex8TQ972NCU17qPgMAJEsMt8c2ffXQVwytX2j_Gkjs"
    > -->
    <img :src="chat.avatar"/>
    <div class="chat__body-text">
      <div class="chat__body-text-info">
        <p class="chat__body-text-info-name">{{chat.user}}</p>
        <p class="chat__body-text-info-date">{{chat.date}}</p>
      </div>
      <p class="chat__body-text-message">{{chat.message}}</p>
    </div>
  </li>
</template>

<script>
export default {
  props: 
  {
    chat: Object
  }
}
</script>
