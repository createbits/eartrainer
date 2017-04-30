<template>
  <div>
    <div v-if="isLoaded">
      <h1 class="center font-merriweather" style="font-size: 3rem">Createbits Ear Trainer</h1>
      <div class="mx-auto mt4 font-roboto" style="max-width: 800px">
        <game-box></game-box>
      </div>
    </div>
    <div v-if="!isLoaded">
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
