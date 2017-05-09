<template>
  <div style="max-width: 900px; margin: 0 auto">
    <div v-if="!gameMode" class="center">
      <div class="clearfix">
        <div class="col col-6">
          <h2 class="h1 mb3">Notes</h2>

          <h3 class="h3">Beginner</h3>
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

          <h3 class="h3">Intermediate</h3>

          <div class="mb2">
            <button-component @click="playNotesInKeyWithConstantScale('c', 'major')">Notes in Key - C Major</button-component>
          </div>
          <div class="mb2">
            <button-component @click="playNotesInKeyWithConstantScale('c', 'minor')">Notes in Key - C Minor</button-component>
          </div>
          <div class="mb2">
            <button-component @click="playAllNotesWithConstantMode('major')">Notes in Key - Random Major</button-component>
          </div>
          <div class="mb2">
            <button-component @click="playAllNotesWithConstantMode('minor')">Notes in Key - Random Minor</button-component>
          </div>

          <!-- h2 class="h2">Advanced</h2 -->
          <!-- TODO: all notes with root flat and sharp notes -->
          <!-- TODO: all notes with offkey notes -->
        </div>
        <div class="col col-6">
          <h2 class="h1 mb3">Chords</h2>

          <h3 class="h3">Beginner</h3>

          <div class="mb2">
            <button-component @click="playSimpleTriads('c')">Simple Triads - C</button-component>
          </div>
          <div class="mb2">
            <button-component @click="playSimpleTriads('e')">Simple Triads - E</button-component>
          </div>
          <div class="mb2">

            <h3 class="h3">Intermediate</h3>

            <button-component @click="playAdvancedTriads('c')">Advanced Triads - C</button-component>
          </div>
          <div class="mb2">
            <button-component @click="playAdvancedTriads('e')">Advanced Triads - E</button-component>
          </div>
        </div>
      </div>
    </div>

    <div v-if="gameMode === 'notes'">
      <notes-game
              :sets="gameData.sets"
              @finish="reset"></notes-game>
    </div>
    <div v-if="gameMode === 'chords'">
      <chords-game
        :data="gameData"
        @finish="reset"
      ></chords-game>
    </div>
  </div>
</template>
<script>
  import {
    generateBeginnerNoteSets,
    generateInKeyWithConstantNoteGameSets,
    generateAllNotesWithConstantModeNoteSets,
  } from '../lib/NoteGameData'
  import ButtonComponent from './Button.vue'
  import NotesGame from './NotesGame.vue'
  import ChordsGame from './ChordsGame.vue'

  const initData = {
    gameMode: null,
    gameData: {},
    setsLength: 12,
  }

  export default {
    components: {
      ButtonComponent,
      NotesGame,
      ChordsGame,
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
      playBeginnerNotes(mode, letters) {
        this.gameMode = 'notes'
        this.gameData = generateBeginnerNoteSets({
          length: this.setsLength,
          mode,
          letters,
        })
      },
      playNotesInKeyWithConstantScale(baseNoteLetter, mode) {
        this.gameMode = 'notes'
        this.gameData = generateInKeyWithConstantNoteGameSets({
          length: this.setsLength,
          baseNoteLetter,
          mode,
        })
      },
      playAllNotesWithConstantMode(mode) {
        this.gameMode = 'notes'
        this.gameData = generateAllNotesWithConstantModeNoteSets({
          mode,
          length: this.setsLength,
        })
      },
      playSimpleTriads(baseNoteLetter) {
        this.gameMode = 'chords'
        this.gameData = {
          baseNoteLetter,
          type: 'simpleTriad',
        }
      },
      playAdvancedTriads(baseNoteLetter) {
        this.gameMode = 'chords'
        this.gameData = {
          baseNoteLetter,
          type: 'advancedTriad',
        }
      },
    },
  }
</script>
