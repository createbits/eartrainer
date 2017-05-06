<template>
  <div>
    <div class="inline-block mr2" v-for="answer in answers">
      <button-component
              :selected="isSelected(answer)"
              :disabled="disabled"
              @click="$emit((isSelected(answer) ? 'removeAnswer' : 'answer'), answer.value)">
        <div v-text="answer.label"></div>
      </button-component>
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
      selected: {
        type: Array,
        required: false,
        default: () => [],
      },
    },
    methods: {
      isSelected({ value }) {
        return this.selected.includes(value)
      },
    }
  }
</script>
