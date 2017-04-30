<template>
  <div>
    <div class="center" v-if="!isPlaying">
      <div>
        This is an ear trainer game based on the method explained by <a href="http://www.miles.be/">Alain Benbassat</a>.
        It's heavily inspired by the <a href="https://play.google.com/store/apps/details?id=com.kaizen9.fet.android">Functional Ear Trainer</a> app
        with the goal to easily add more game modes.
        Have fun playing!
      </div>

      <div class="mt3">
        <button-component @click="isPlaying = true">Start playing</button-component>
      </div>
    </div>

    <div v-if="isPlaying">
      <div class="center" v-if="!gameMode">
        <div class="mb2">
          <button-component @click="playNotes('c', 'major')">All Notes - C Major</button-component>
        </div>
        <div class="mb2">
          <button-component @click="playNotes('e', 'major')">All Notes - E Major</button-component>
        </div>
        <div>
          <button-component @click="playNotes('c', 'minor')">All Notes - C Minor</button-component>
        </div>
      </div>

      <div v-if="gameMode === 'notes'">
        <notes-game :baseNoteLetter="gameData.baseNoteLetter" :scale="gameData.scale" @finish="reset"></notes-game>
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
    gameData: {},
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
      playNotes(baseNoteLetter, scale) {
        this.gameMode = 'notes'
        this.gameData = { baseNoteLetter, scale }
      },
    },
  }
</script>
