<template>
  <div class="mx-auto center">
    <div class="mb2">
      <game-description
              :currentRound="round"
              :roundsCount="roundEnd"
              description="Find out which note is played after the II - V - I progression"
      >
        <slot>
          <div class="mt2">Key: <span class="bold" v-text="gameKey"></span></div>
        </slot>
      </game-description>
    </div>

    <div>
      <answer-buttons
              v-if="!hasAnswer"
              :answers="currentSet.answers"
              :disabled="!roundAnswer"
              @answer="provideAnswer(arguments[0])"></answer-buttons>
    </div>

    <div v-if="hasAnswer">
      You got the <span class="bold" v-text="rightOrWrong"></span> note! The note played was: <span v-text="formatAnswer(roundAnswer)" class="bold"></span>
      <div class="mt1" v-if="!hasRightAnswer">You played: <span class="bold" v-text="formatAnswer(providedAnswer)"></span></div>

      <div class="mt2">
        <button-component @click="playNextRound" v-if="!isPlayingResolve && canPlayNextRound">Next round</button-component>
        <div v-if="isFinished">
          <finished-game-screen
                  :answersLength="roundEnd"
                  :correctAnswers="correctAnswerCount"
                  @finish="$emit('finish')"
          ></finished-game-screen>
        </div>
      </div>

      <div class="mt3" v-if="!isPlayingResolve && canPlayNextRound">
        <button-component @click="$emit('finish')" >Go back</button-component>
      </div>
    </div>
  </div>
</template>
<script>
  import {
    playRandomSequence,
    playResolveToTonic,
    generateTwoFiveSequence,
    generateScaleNotes,
    scaleFromSet,
  } from '../lib/NoteGamePlayer'
  import { startCase } from 'lodash'
  import { formatLetter } from 'playnote/lib/NoteTransformer'
  import AnswerButtons from './AnswerButtons.vue'
  import ButtonComponent from './Button.vue'
  import GameDescription from './GameDescription.vue'
  import FinishedGameScreen from './FinishedGameScreen.vue'
  import { gameMixin } from './GameMixin.js'

  export default {
    components: {
      AnswerButtons,
      ButtonComponent,
      GameDescription,
      FinishedGameScreen,
    },
    mixins: [gameMixin],
    props: {
      sets: {
        type: Array,
      },
    },
    data() {
      return {
        isPlayingResolve: false,
      }
    },
    computed: {
      gameKey() {
        return `${this.currentSet.baseNoteLetter.toUpperCase()} ${startCase(this.currentSet.mode)}`
      },
      currentSetScale() {
        return scaleFromSet(this.currentSet)
      },
    },
    methods: {
      formatAnswer(a) {
        return formatLetter(a).replace('_', ' ')
      },
      playQuestion() {
        playRandomSequence(
          generateTwoFiveSequence(this.currentSetScale),
          this.currentSet.answers,
        ).then(answer => this.defineRoundAnswer(answer))
      },
      playResolveToTonic() {
        this.isPlayingResolve = true
        playResolveToTonic(
          this.roundAnswer,
          generateScaleNotes(this.currentSetScale),
        ).then(() => this.isPlayingResolve = false)
      },
      provideAnswer(value) {
        this.playResolveToTonic()
        this.defineUserAnswer(value)
      },
    },
  }
</script>
