<template>
  <div>
    <span v-text="description"></span>

    <slot></slot>
    <div class="mt2">Round: <span class="bold" v-text="currentRound"></span> / <span v-text="roundsCount"></span></div>
  </div>
</template>
<script>
  export default {
    props: {
      description: { type: String },
      currentRound: { type: Number },
      roundsCount: { type: Number },
    },
  }
</script>
