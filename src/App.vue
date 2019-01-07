<template>
  <div id="app" class="indigo darken-4">
    <Sidebar/>
    
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

<style scoped>
#app {
  height: 100vh;
}
</style>
