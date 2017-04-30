<template>
  <div>
    <div class="center" v-if="!isPlaying">
      <div>
        This is an ear trainer game based on the method explained by <a href="http://www.miles.be/">Alain Benbassat</a>.
        It's heavily inspired by the <a href="https://play.google.com/store/apps/details?id=com.kaizen9.fet.android">Functional Ear Trainer</a> app
        with the goal to allow more game modes.
        Have fun playing!
      </div>

      <div class="mt3">
        <button-component @click="isPlaying = true">Start playing</button-component>
      </div>
    </div>

    <div v-if="isPlaying">
      <div class="center" v-if="!gameMode">
        <button-component @click="gameMode = 'notes'">Basic Notes (Tonic, Dominant etc.)</button-component>
      </div>

      <div v-if="gameMode === 'notes'">
        <notes-game @finish="reset"></notes-game>
      </div>
    </div>
  </div>
</template>
<script>
  import ButtonComponent from './Button.vue'
  import NotesGame from './NotesGame.vue'

  const initData = {
    isPlaying: false,
    gameMode: null,
  }

  export default {
    components: {
      ButtonComponent,
      NotesGame,
    },
    data() {
      return { ...initData }
    },
    methods: {
      reset() {
        Object.keys(initData).forEach(key => {
          this[key] = initData[key]
        })
      },
    },
  }
</script>
