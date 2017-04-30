<template>
  <div>
    <div class="inline-block mr2" v-for="answer in answers">
      <button-component :disabled="disabled" @click="$emit('answer', answer.value)"><div v-text="answer.label"></div></button-component>
    </div>
  </div>
</template>
<script>
  import ButtonComponent from './Button.vue'

  export default {
    components: { ButtonComponent },
    props: {
      answers: {
        type: Array,
      },
      disabled: {
        type: Boolean,
        required: false,
      },
    },
  }
</script>
