<template>
  <div>
    <div class="inline-block mr2" v-for="answer in whiteKeyAnswers">
      <button-component :disabled="disabled" @click="$emit('answer', answer.value)"><div v-text="answer.label"></div></button-component>
    </div>
  </div>
</template>
<script>
  import ButtonComponent from './Button.vue'

  export default {
    components: { ButtonComponent },
    props: {
      disabled: {
        type: Boolean,
        required: false,
      },
    },
    data() {
      return {
        whiteKeyAnswers: [
          { label: 'c', value: 'c' },
          { label: 'd', value: 'd' },
          { label: 'e', value: 'e' },
          { label: 'f', value: 'f' },
          { label: 'g', value: 'g' },
          { label: 'a', value: 'a' },
          { label: 'b', value: 'b' },
          { label: 'c', value: 'c' },
        ]
      }
    },
  }
</script>
