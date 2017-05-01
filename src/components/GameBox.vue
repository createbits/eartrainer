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
        <div class="">
          <button-component @click="isPlaying = true">Start playing</button-component>
        </div>
        <div class="mt2">
          <button-component @click="openExplanationModal()">How?</button-component>
        </div>
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
        <button-component @click="playAllNotesWithConstantScale('c', 'major')">All Notes - C Major</button-component>
      </div>
      <div class="mb2">
        <button-component @click="playAllNotesWithConstantScale('c', 'minor')">All Notes - C Minor</button-component>
      </div>
      <div class="mb2">
        <button-component @click="playAllNotesWithConstantMode('major')">All Notes - Random Major</button-component>
      </div>
      <div class="mb2">
        <button-component @click="playAllNotesWithConstantMode('minor')">All Notes - Random Minor</button-component>
      </div>

      <!-- h2 class="h2">Advanced</h2 -->
    </div>

    <div v-if="gameMode === 'notes'">
      <notes-game
              :sets="gameData.sets"
              @finish="reset"></notes-game>
    </div>
  </div>
</template>
<script>
  import { range, sample } from 'lodash'
  import { scale, note, rootNoteLetters } from '../lib/NotePlayer'
  import { formatLetter } from '../lib/NoteTransformer'
  import ButtonComponent from './Button.vue'
  import NotesGame from './NotesGame.vue'

  const initData = {
    isPlaying: false,
    gameMode: null,
    gameData: {},
  }

  const mapNoteToAnswer = note => ({
    value: note,
    label: formatLetter(note).replace('_', ' '),
  })

  export default {
    components: {
      ButtonComponent,
      NotesGame,
    },
    data() {
      return { ...initData }
    },
    methods: {
      openExplanationModal() {
        alert('Explain how')
      },
      reset() {
        Object.keys(initData).forEach(key => {
          this[key] = initData[key]
        })
      },
      playBeginnerNotes(mode, letters) {
        this.gameMode = 'notes'

        const answers = letters.map(d => note(d, 4)).map(mapNoteToAnswer)

        this.gameData = {
          sets: range(12).map(() => ({
            baseNoteLetter: 'c',
            mode,
            answers,
          })),
        }
      },
      playAllNotesWithConstantScale(baseNoteLetter, mode) {
        this.gameMode = 'notes'

        const answers = scale(baseNoteLetter, mode)
          .base(4)
          .notes([1, 2, 3, 4, 5, 6, 7, 8])
          .map(mapNoteToAnswer)

        this.gameData = {
          sets: range(12).map(() => ({
            baseNoteLetter,
            mode,
            answers,
          })),
        }
      },
      playAllNotesWithConstantMode(mode) {
        this.gameMode = 'notes'

        this.gameData = {
          sets: range(12)
            .map(() => sample(rootNoteLetters))
            .map((baseNoteLetter) => ({
              baseNoteLetter,
              mode,
              answers: scale(baseNoteLetter, mode)
                .base(4)
                .notes([1, 2, 3, 4, 5, 6, 7, 8])
                .map(mapNoteToAnswer),
            })),
        }
      },
    },
  }
</script>
