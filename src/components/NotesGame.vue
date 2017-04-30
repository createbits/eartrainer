<template>
  <div class="mx-auto center">
    <div class="mb2">
      Find out which note is played after the II - V - I progression.

      <div class="mt2">Key: <span class="bold" v-text="gameKey"></span></div>
      <div class="mt2">Round: <span class="bold" v-text="round"></span> / <span v-text="roundEnd"></span></div>
    </div>

    <div>
      <answer-buttons
              v-if="!hasAnswer"
              :answers="answers"
              :disabled="!roundAnswer"
              @answer="provideAnswer(arguments[0])"></answer-buttons>
    </div>

    <div v-if="hasAnswer">
      You got the <span class="bold" v-text="rightOrWrong"></span> note! The note played was: <span v-text="formatAnswer(roundAnswer)" class="b"></span>
      <div class="mt1" v-if="!hasRightAnswer">You played: <span class="bold" v-text="formatAnswer(providedAnswer)"></span></div>

      <div class="mt2">

        <button-component @click="playNextRound" v-if="canPlayNextRound">Next round</button-component>
        <div v-if="isFinished">
          <h2 class="my3">Congrats! You finished the game</h2>
          <div class="mb2">You got <span v-text="correctAnswerCount"></span> of <span v-text="roundEnd"></span> points</div>
          <button-component @click="$emit('finish')" >Go back</button-component>
        </div>
      </div>

      <div class="mt3" v-if="canPlayNextRound">
        <button-component @click="$emit('finish')" >Go back</button-component>
      </div>
    </div>
  </div>
</template>
<script>
  import { sample, drop, take, startCase } from 'lodash'
  import { playSequence, note, scale } from '../lib/NotePlayer'
  import { formatLetter } from '../lib/NoteTransformer'
  import AnswerButtons from './NoteAnswerButtons.vue'
  import ButtonComponent from './Button.vue'

  const playRandomSequence = async (twoFiveOneSequence, answers) => {
    const answer = sample(answers)

    // TODO: refactor answers to contain notes and only display it without the octave
    await playSequence([
      ...twoFiveOneSequence,
      { notes: [answer.value], length: 1000, offset: 1000 },
    ])

    return answer.value
  }

  const playResolveToTonic = async (scope) => {
    const { scaleNotes } = scope
    const toneIndex = scaleNotes.indexOf(scope.roundAnswer)

    let resolvingTones = [scaleNotes[0]]

    if (toneIndex > 0) {
      resolvingTones = toneIndex >= 4
        ? drop(scaleNotes, toneIndex)
        : take(scaleNotes, (toneIndex + 1)).reverse()
    }

    return await playSequence(resolvingTones.map((note, i) => ({
      notes: [note],
      length: (i === 0 || (resolvingTones.length - 1) === i) ? 800 : 400,
    })))
  }

  const initData = {
    round: 1,
    roundEnd: 12,
    roundAnswer: '',
    providedAnswer: '',
    isPlayingResolve: false,
    correctAnswerCount: 0,
  }

  export default {
    components: { AnswerButtons, ButtonComponent },
    props: {
      baseNoteLetter: {
        type: String,
      },
      scale: {
        type: String,
      },
      answers: {
        type: Array,
      },
    },
    data() {
      const gameScale = scale(this.baseNoteLetter, this.scale)
      const scaleWithBase = gameScale.base(4)

      return {
        ...initData,
        scaleNotes: scaleWithBase.notes([1, 2, 3, 4, 5, 6, 7, 8]),
        twoFiveOneSequence: [
          { notes: scaleWithBase.notes([2, 4, 6]), length: 800 },
          { notes: scaleWithBase.notes([5, 7, 9]), length: 800 },
          { notes: scaleWithBase.notes([1, 3, 5]), length: 1600 },
        ],
      }
    },
    mounted() {
      this.playSequence()
    },
    computed: {
      hasAnswer() {
        return !!this.providedAnswer
      },
      rightOrWrong() {
        return this.hasRightAnswer ? 'right' : 'wrong'
      },
      hasRightAnswer() {
        return this.providedAnswer === this.roundAnswer
      },
      isFinished() {
        return this.round === this.roundEnd
      },
      canPlayNextRound() {
        return !this.isPlayingResolve && this.round < this.roundEnd
      },
      gameKey() {
        return `${this.baseNoteLetter.toUpperCase()} ${startCase(this.scale)}`
      },
    },
    methods: {
      formatAnswer(a) {
        return formatLetter(a)
      },
      playNextRound() {
        this.roundAnswer = ''
        this.providedAnswer = ''

        if (this.round < this.roundEnd) {
          this.round += 1
          this.playSequence()
        }
      },
      playSequence() {
        const { twoFiveOneSequence, answers } = this
        playRandomSequence(twoFiveOneSequence, answers).then(answer => this.roundAnswer = answer)
      },
      playResolveToTonic() {
        this.isPlayingResolve = true
        playResolveToTonic(this).then(() => this.isPlayingResolve = false)
      },
      provideAnswer(value) {
        if (!this.roundAnswer) {
          return
        }

        this.playResolveToTonic()
        this.providedAnswer = value
        if (this.providedAnswer === this.roundAnswer) this.correctAnswerCount += 1
      },
    },
  }
</script>
