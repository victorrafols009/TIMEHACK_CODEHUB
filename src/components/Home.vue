<template>
  <div class="Home chat">
    <div class="chat__header">
      <p>@ Kiana</p>
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
        <li class="chat__body-incoming">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxyCupEcex8TQ972NCU17qPgMAJEsMt8c2ffXQVwytX2j_Gkjs"/>
          <div class="chat__body-text">
            <div class="chat__body-text-info">
              <p class="chat__body-text-info-name">Kiana</p>
              <p class="chat__body-text-info-date">Today at 1:57PM</p>
            </div>
            <p class="chat__body-text-message">Hi there Captain ~ !</p>
          </div>
        </li>
        <li class="chat__body-outgoing">
          <img src="https://pm1.narvii.com/6991/444e4ab9d55132405af1b5dbac03ed6341f1f245r1-641-429v2_hq.jpg"/>
          <div class="chat__body-text">
            <div class="chat__body-text-info">
              <p class="chat__body-text-info-name">Captain</p>
              <p class="chat__body-text-info-date">Today at 1:57PM</p>
            </div>
            <p class="chat__body-text-message">No..</p>
          </div>
        </li>
        <li class="chat__body-incoming">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxyCupEcex8TQ972NCU17qPgMAJEsMt8c2ffXQVwytX2j_Gkjs"/>
          <div class="chat__body-text">
            <div class="chat__body-text-info">
              <p class="chat__body-text-info-name">Kiana</p>
              <p class="chat__body-text-info-date">Today at 1:57PM</p>
            </div>
            <p class="chat__body-text-message">But, i didn't even said anything yet</p>
            <p class="chat__body-text-message">D:</p>
          </div>
        </li>
        <li class="chat__body-outgoing">
          <img src="https://pm1.narvii.com/6991/444e4ab9d55132405af1b5dbac03ed6341f1f245r1-641-429v2_hq.jpg"/>
          <div class="chat__body-text">
            <div class="chat__body-text-info">
              <p class="chat__body-text-info-name">Captain</p>
              <p class="chat__body-text-info-date">Today at 1:57PM</p>
            </div>
            <p class="chat__body-text-message">No..</p>
            <p class="chat__body-text-message">I know what you want Kiana...</p>
            <p class="chat__body-text-message">And I'm not having any of it.</p>
          </div>
        </li>
        <li class="chat__body-incoming">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxyCupEcex8TQ972NCU17qPgMAJEsMt8c2ffXQVwytX2j_Gkjs"/>
          <div class="chat__body-text">
            <div class="chat__body-text-info">
              <p class="chat__body-text-info-name">Kiana</p>
              <p class="chat__body-text-info-date">Today at 1:57PM</p>
            </div>
            <p class="chat__body-text-message">But, Kaaaaannnnccchhhhhoooooooouuuuuuu D:</p>
            <p class="chat__body-text-message">-play sad piano</p>
          </div>
        </li>
        <li class="chat__body-bot">
          <img src="https://images.discordapp.net/avatars/434737143395516416/a2b9761b4fd5af86af088200c6060b94.png?size=512"/>
          <div class="chat__body-text">
            <div class="chat__body-text-info">
              <p class="chat__body-text-info-name">Ai-chan</p>
              <p class="chat__body-text-info-date">Today at 1:57PM</p>
            </div>
            <p class="chat__body-text-message">please type the number from these query results</p>
          <div class="chat__body-bot-card">
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="chat__input">
      <input type="text" placeholder="say something nice to @kiana"/>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home"
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
