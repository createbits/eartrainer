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

    await playSequence([
      ...twoFiveOneSequence,
      { notes: [note(answer.value, 4)], length: 1000, offset: 1000 },
    ])

    return answer.value
  }

  const playResolveToTonic = async (scope) => {
    const gameScale = scale(scope.baseNoteLetter, scope.scale)
    const gameDegrees = gameScale.getDegrees()
    const toneIndex = gameDegrees.indexOf(scope.roundAnswer)
    const baseNoteDegree = gameScale.getDegree(1)

    let resolvingTones = [note(baseNoteDegree, 4)]

    if (toneIndex > 0) {
      // TODO: why does it jump an octave when using e major?
      resolvingTones = toneIndex >= 4
        ? [...drop(gameDegrees, toneIndex).map(n => note(n, 4)), note(baseNoteDegree, 5)]
        : take(gameDegrees, (toneIndex + 1)).map(n => note(n, 4)).reverse()
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

      return {
        ...initData,
        twoFiveOneSequence: [
          { notes: [
            note(gameScale.getDegree(2), 4),
            note(gameScale.getDegree(4), 4),
            note(gameScale.getDegree(6), 4),
          ], length: 800 },
          { notes: [
            note(gameScale.getDegree(5), 4),
            note(gameScale.getDegree(7), 4),
            note(gameScale.getDegree(2), 5),
          ], length: 800 },
          { notes: [
            note(gameScale.getDegree(1), 4),
            note(gameScale.getDegree(3), 4),
            note(gameScale.getDegree(5), 4),
          ], length: 1600 },
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
