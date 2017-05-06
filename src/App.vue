<template>
  <div>
    <div v-if="isLoaded">
      <h1 @click="$router.push({ name: 'home' })"
          class="center pointer font-roboto weight-900 h1-huge">createbits. ear trainer.</h1>

      <div class="font-roboto">
        <router-view></router-view>
      </div>
    </div>
    <div v-if="!isLoaded" class="font-roboto center" style="margin-top: 200px">
      <loader></loader>
    </div>
  </div>
</template>
<script>
  import Loader from './components/Loader.vue'
  import GameBox from './components/GameBox.vue'

  export default {
    components: { GameBox, Loader },
    data() {
      return {
        isLoaded: false,
      }
    },
  }
</script>
