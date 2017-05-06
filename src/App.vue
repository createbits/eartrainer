<template>
  <div>
    <div v-if="isLoaded">
      <h1 @click="$router.push({ name: 'home' })"
          class="center pointer font-merriweather"
          style="font-size: 3rem">Createbits Ear Trainer</h1>

      <div class="font-roboto">
        <router-view></router-view>
      </div>
    </div>
    <div v-if="!isLoaded" class="font-merriweather center" style="margin-top: 200px">
      Loading...
    </div>
  </div>
</template>
<script>
  import GameBox from './components/GameBox.vue'

  export default {
    data() {
      return {
        isLoaded: false,
      }
    },
    components: { GameBox },
  }
</script>
