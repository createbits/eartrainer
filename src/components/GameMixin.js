export const gameMixin = {
  data() {
    return {
      round: 1,
      roundEnd: this.sets.length,
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
      return this.providedAnswer === this.roundAnswer
    },
    isFinished() {
      return this.round === this.roundEnd
    },
    canPlayNextRound() {
      return this.round < this.roundEnd
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
      this.providedAnswer = answer
    },
    incrementCorrectAnswers() {
      this.correctAnswerCount += 1
    },
  }
}
