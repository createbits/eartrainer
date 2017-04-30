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

    <div v-if="isPlaying && !gameMode" class="center">
      <h2 class="h2">Beginner</h2>
      <div class="mb2">
        <button-component @click="playBeginnerNotes('major', ['c', 'd', 'e', 'f'])">C to F Notes - C Major</button-component>
      </div>
      <div class="mb2">
        <button-component @click="playBeginnerNotes('major', ['g', 'a', 'b', 'c'])">G to C Notes - C Major</button-component>
      </div>
      <div class="mb2">
        <button-component @click="playBeginnerNotes('minor', ['c', 'd', 'eFlat', 'f'])">C to F Notes - C Minor</button-component>
      </div>
      <div class="mb2">
        <button-component @click="playBeginnerNotes('minor', ['g', 'aFlat', 'bFlat', 'c'])">G to C Notes - C Minor</button-component>
      </div>

      <h2 class="h2">Intermediate</h2>

      <div class="mb2">
        <button-component @click="playAllNotes('c', 'major')">All Notes - C Major</button-component>
      </div>
      <div class="mb2">
        <button-component @click="playAllNotes('g', 'minor')">All Notes - G Minor</button-component>
      </div>
      <div class="mb2">
        <button-component @click="playAllNotes('e', 'major')">All Notes - Random Major</button-component>
      </div>
      <div class="mb2">
        <button-component @click="playAllNotes('c', 'minor')">All Notes - Random Minor</button-component>
      </div>

      <!-- h2 class="h2">Advanced</h2 -->
    </div>

    <div v-if="gameMode === 'notes'">
      <notes-game
              :answers="gameData.answers"
              :baseNoteLetter="gameData.baseNoteLetter"
              :scale="gameData.scale"
              @finish="reset"></notes-game>
    </div>
  </div>
</template>
<script>
  import { scale, note } from '../lib/NotePlayer'
  import { formatLetter } from '../lib/NoteTransformer'
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
      playBeginnerNotes(scale, letters) {
        this.gameMode = 'notes'

        // TODO: restructure so that the the notesgame uses sets with answers and question sequence
        // TODO: so that the random major / minor game can be played
        this.gameData = {
          baseNoteLetter: 'c',
          scale,
          answers: letters.map(d => ({
            value: note(d, 4),
            label: formatLetter(d),
          })),
        }
      },
      playAllNotes(baseNoteLetter, scaleKey) {
        this.gameMode = 'notes'

        this.gameData = {
          baseNoteLetter,
          scale: scaleKey,
          answers: scale(baseNoteLetter, scaleKey)
            .base(4)
            .notes([1, 2, 3, 4, 5, 6, 7, 8])
            .map(d => ({
              value: d,
              label: formatLetter(d),
            })),
        }
      },
    },
  }
</script>
