<template>
  <div class="mx-auto center">
    <div class="mb2">
      <game-description
              :currentRound="round"
              :roundsCount="roundEnd"
              description="Find out which chord is played"
      >
        <slot>
          <div class="mt2">Base Note: <span class="bold" v-text="baseNoteLabel"></span></div>
        </slot>
      </game-description>
    </div>

    <div v-if="!hasAnswer">
      <div class="my3">
        <answer-buttons
                :answers="rootNoteLetterAnswers"
                :disabled="!!data.baseNoteLetter"
                :selected="[selectedRootNoteAnswer]"
                @answer="provideAnswer(arguments[0])"></answer-buttons>
      </div>

      <div class="mt2" v-for="answers in batchedIntervalAnswers">
        <answer-buttons
                :answers="answers"
                :selected="currentIntervalAnswers"
                @removeAnswer="removeIntervalAnswer(arguments[0])"
                @answer="currentIntervalAnswers.push(arguments[0])"
        ></answer-buttons>
      </div>

      <div class="mt2">
        <button-component @click="provideAnswer">Provide Answer</button-component>
      </div>
    </div>

    <div v-if="hasAnswer">
      You have chosen the <span class="bold" v-text="rightOrWrong"></span> interval!
      The played chord was: <span v-text="roundAnswer.label" class="bold"></span>

      <div class="mt2">
        <button-component @click="playNextRound" v-if="canPlayNextRound">Next round</button-component>
        <div v-if="isFinished">
          <finished-game-screen
            :answersLength="roundEnd"
            :correctAnswers="correctAnswerCount"
            @finish="$emit('finish')"
          ></finished-game-screen>
        </div>
      </div>

      <div class="mt3" v-if="canPlayNextRound">
        <button-component @click="$emit('finish')" >Go back</button-component>
      </div>
    </div>
  </div>
</template>
<script>
  import { chunk, isEqual, some } from 'lodash'
  import { rootNoteLetters } from 'playnote'
  import { gameMixin } from './GameMixin'
  import {
    generateChordsSets,
    getIntervalAnswers
  } from '../lib/ChordsGameData.js'
  import { playChord } from '../lib/ChordsGamePlayer.js'
  import AnswerButtons from './AnswerButtons.vue'
  import FinishedGameScreen from './FinishedGameScreen.vue'
  import GameDescription from './GameDescription.vue'
  import ButtonComponent from './Button.vue'

  export default {
    components: {
      AnswerButtons,
      ButtonComponent,
      GameDescription,
      FinishedGameScreen,
    },
    mixins: [gameMixin],
    props: {
      data: {
        type: Object,
      },
      setsLength: {
        type: Number,
        default: 12,
      },
    },
    data() {
      const { baseNoteLetter, type } = this.data

      return {
        currentIntervalAnswers: [],
        sets: generateChordsSets({
          type,
          baseNoteLetter,
          length: this.setsLength,
        }),
      }
    },
    computed: {
      baseNoteLabel() {
        return this.selectedRootNoteAnswer.toUpperCase()
      },
      selectedRootNoteAnswer() {
        const { baseNoteLetter } = this.data

        if (baseNoteLetter) {
          return baseNoteLetter
        }
      },
      rootNoteLetterAnswers() {
        return rootNoteLetters.map(value => ({
          label: value.toUpperCase(),
          value,
        }))
      },
      intervalAnswers() {
        return getIntervalAnswers()
      },
      batchedIntervalAnswers() {
        return chunk(this.intervalAnswers, 4)
      },
    },
    methods: {
      resetAnswers() {
        this.currentIntervalAnswers = []
      },
      playQuestion() {
        this.resetAnswers()
        playChord(this.currentSet)
        this.defineRoundAnswer(this.currentSet)
      },
      removeIntervalAnswer(selected) {
        this.currentIntervalAnswers = this.currentIntervalAnswers.filter(answer =>
          !isEqual(answer, selected)
        )
      },
      compareAnswers(provided, actual) {
        return provided.baseNoteLetter === actual.baseNoteLetter
          && provided.intervals.length === actual.intervals.length
          && provided.intervals.filter((intv) => {
            return some(actual.intervals, actualIntv => isEqual(intv, actualIntv))
          }).length === provided.intervals.length
      },
      provideAnswer() {
        this.defineUserAnswer({
          baseNoteLetter: this.selectedRootNoteAnswer,
          intervals: [
            { type: 'octave' },
            ...this.currentIntervalAnswers,
          ],
        })
      },
    },
  }
</script>
