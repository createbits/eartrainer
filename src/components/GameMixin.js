import { isEqual } from 'lodash'

export const gameMixin = {
  data() {
    return {
      round: 1,
      roundEnd: this.sets ? this.sets.length : this.setsLength,
      roundAnswer: null,
      providedAnswer: null,
      correctAnswerCount: 0,
    }
  },
  mounted() {
    this.playQuestion()
  },
  computed: {
    hasAnswer() {
      return !!this.providedAnswer
    },
    rightOrWrong() {
      return this.hasRightAnswer ? 'right' : 'wrong'
    },
    hasRightAnswer() {
      return this.compareAnswers
        ? this.compareAnswers(this.providedAnswer, this.roundAnswer)
        : isEqual(this.providedAnswer, this.roundAnswer)
    },
    isFinished() {
      return this.round === this.roundEnd
    },
    canPlayNextRound() {
      return this.round < this.roundEnd
    },
    currentSet() {
      return this.sets[this.round - 1]
    },
  },
  methods: {
    playNextRound() {
      this.roundAnswer = ''
      this.providedAnswer = ''

      if (this.round < this.roundEnd) {
        this.round += 1
        this.playQuestion()
      }
    },
    defineRoundAnswer(answer) {
      this.roundAnswer = answer
    },
    defineUserAnswer(answer) {
      if (!this.roundAnswer) {
        return
      }

      this.providedAnswer = answer
      if (this.hasRightAnswer) this.incrementCorrectAnswers()
    },
    incrementCorrectAnswers() {
      this.correctAnswerCount += 1
    },
  }
}
