<template>
  <div>
    <h2 class="my3">Congrats! You finished the game</h2>
    <div class="mb2">
      You got <span v-text="correctAnswers"></span> out of <span v-text="answersLength"></span> points
      <div class="my2 bold"><span v-text="correctPercentage"></span>%</div>
    </div>
    <button-component @click="$emit('finish')" >Go back</button-component>
  </div>
</template>
<script>
  import ButtonComponent from './Button.vue'

  export default {
    components: { ButtonComponent },
    props: {
      answersLength: { type: Number },
      correctAnswers: { type: Number },
    },
    computed: {
      correctPercentage() {
        return Math.floor(this.correctAnswers / this.answersLength * 100)
      },
    },
  }
</script>
