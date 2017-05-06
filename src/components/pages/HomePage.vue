<template>
  <div class="center">
    <div class="mx-auto" style="max-width: 800px">
      <div>
        This is an ear trainer game based on the method explained by <a href="http://www.miles.be/">Alain Benbassat</a>.
        It's heavily inspired by the <a href="https://play.google.com/store/apps/details?id=com.kaizen9.fet.android">Functional Ear Trainer</a> app
        with the goal to easily add more game modes.
        Have fun playing!
      </div>

      <div class="mt3">
        <div class="">
          <button-component @click="$router.push({ name: 'play' })">Start playing</button-component>
        </div>
        <div class="mt2">
          <button-component @click="openExplanationModal()">How?</button-component>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import ButtonComponent from '../Button.vue'

  export default {
    components: {
      ButtonComponent,
    },
    methods: {
      openExplanationModal() {
        alert('Explain how')
      },
    },
  }
</script>
