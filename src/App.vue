<template>
  <div id="app" class="flex">
    <Sidebar/>
    <Home/>
  </div>
</template>

<script>
import Home from './components/Home.vue'
import Sidebar from './components/Sidebar/Sidebar.vue'
export default {
  name: 'App',
  components: {
    Home,
    Sidebar
  }
}
</script>

<style lang="scss">
@import "./scss/main.scss";
#app{
  height: 100vh;
}
</style>
