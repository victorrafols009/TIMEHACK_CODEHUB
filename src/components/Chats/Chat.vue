<template>
  <li class="chat__body-incoming">
    <img :src="chat.avatar">
    <div class="chat__body-text">
      <div class="chat__body-text-info">
        <p class="chat__body-text-info-name">{{chat.user}}</p>
        <p class="chat__body-text-info-date">{{chat.date}}</p>
      </div>
      <p class="chat__body-text-message">{{chat.message}}</p>
      <iframe
        class="disappear"
        id="ytplayer"
        type="text/html"
        :src="chat.video"
        frameborder="0"
        allowfullscreen
        allow="autoplay"
      />
      <!-- List will be avaiable when access by bot -->
      <!-- <ol class="song">
        <p class="song__title">{{chat.header}}</p>
        <li class="song__list">{{chat.list}}</li>
      </ol> -->
    </div>
  </li>
</template>

<script>
export default {
  props: {
    chat: Object
  }
};
</script>
<style lang="scss" scoped>
//CUSTOM LIST
@import "../../scss/_variables.scss";
.song {
  min-width: 500px;
  background-color: $gray2;
  border-left: $red solid 5px;
  margin: 10px 5px;
  &__title {
    padding: 10px;
    font-weight: bold;
  }
  &__list {
    padding: 10px;
  }
}
</style>
