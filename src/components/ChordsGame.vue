<template>
  <div class="mx-auto center">
    <div class="mb2">
      Find out which chord is played.
    </div>

    Chords game!
  </div>
</template>
<script>
  import { range } from 'lodash'
  import { gameMixin } from './GameMixin'
  import AnswerButtons from './NoteAnswerButtons.vue'
  import ButtonComponent from './Button.vue'

  export default {
    components: { AnswerButtons, ButtonComponent },
    mixins: [gameMixin],
    props: {
      data: {
        type: Object,
      },
    },
    computed: {
      gameSets() {
        //return
      },
    },
    methods: {
      playQuestion() {

      },
    },
  }
</script>
