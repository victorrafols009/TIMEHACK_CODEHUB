<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import Home from './components/Home.vue'
import Login from './components/Login.vue'
export default {
  name: 'App',
  components: {
    Home,
    Login
  }
}
</script>

<style lang="scss">
@import "./scss/main.scss";
</style>
