<template>
  <div class="mx-auto center">
    <div class="mb2">
      Find out which note is played after the II - V - I progression.

      <div class="mt2">Key: <span class="bold">C Major</span></div>
      <div class="mt2">Round: <span class="bold" v-text="round"></span> / <span v-text="roundEnd"></span></div>
    </div>

    <div>
      <answer-buttons
              v-if="!hasAnswer"
              :disabled="!roundAnswer"
              @answer="provideAnswer(arguments[0])"></answer-buttons>
    </div>

    <div v-if="hasAnswer">
      You got the <span class="bold" v-text="rightOrWrong"></span> note! The note played was: <span v-text="roundAnswer.toUpperCase()" class="b"></span>
      <div class="mt1" v-if="!hasRightAnswer">You played: <span class="bold" v-text="providedAnswer.toUpperCase()"></span></div>

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
  import { sample, drop, take } from 'lodash'
  import { playSequence, note, notesForChord, rootNoteLetters } from '../lib/NotePlayer'
  import AnswerButtons from './NoteAnswerButtons.vue'
  import ButtonComponent from './Button.vue'

  const twoFiveOneSequence = [
    { notes: notesForChord(note('d', 4), [
      { type: 'minor', distance: 3 },
      { type: 'perfect', distance: 5 },
    ]), length: 800 },
    { notes: notesForChord(note('g', 4), [
      { type: 'major', distance: 3 },
      { type: 'perfect', distance: 5 },
    ]), length: 800 },
    { notes: notesForChord(note('c', 4), [
      { type: 'major', distance: 3 },
      { type: 'perfect', distance: 5 },
    ]), length: 1600 },
  ]

  const playRandomSequence = async () => {
    const answer = sample(rootNoteLetters)

    await playSequence([
      ...twoFiveOneSequence,
      { notes: [note(answer, 4)], length: 1000, offset: 1000 },
    ])

    return answer
  }

  const playResolveToTonic = async (tone) => {
    const toneIndex = rootNoteLetters.indexOf(tone)

    let resolvingTones = [note('c', 4)]

    if (toneIndex > 0) {
      resolvingTones = toneIndex >= 4
        ? [...drop(rootNoteLetters, toneIndex).map(n => note(n, 4)), note('c', 5)]
        : take(rootNoteLetters, (toneIndex + 1)).map(n => note(n, 4)).reverse()
    }

    console.log(resolvingTones)
    return await playSequence(resolvingTones.map((note, i) => ({
      notes: [note],
      length: (i === 0 || (resolvingTones.length - 1) === i) ? 800 : 400,
    })))
  }

  const initData = {
    round: 1,
    roundEnd: 16,
    roundAnswer: '',
    providedAnswer: '',
    isPlayingResolve: false,
    correctAnswerCount: 0,
  }

  export default {
    components: { AnswerButtons, ButtonComponent },
    data() {
      return { ...initData }
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
      }
    },
    methods: {
      playNextRound() {
        this.roundAnswer = ''
        this.providedAnswer = ''

        if (this.round < this.roundEnd) {
          this.round += 1
          this.playSequence()
        }
      },
      playSequence() {
        playRandomSequence().then(answer => this.roundAnswer = answer)
      },
      playResolveToTonic() {
        this.isPlayingResolve = true
        playResolveToTonic(this.roundAnswer).then(() => this.isPlayingResolve = false)
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
