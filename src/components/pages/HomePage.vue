<template>
  <div class="">
    <div class="mx-auto" style="max-width: 800px">
      <div class="line-height-4 h3">
        This is an ear trainer game based on the method explained by <a href="http://www.miles.be/">Alain Benbassat</a>.
        It's heavily inspired by the <a href="https://play.google.com/store/apps/details?id=com.kaizen9.fet.android">Functional Ear Trainer</a> app
        with the goal to easily add more game modes.
        Have fun playing!
      </div>

      <modal name="explanation" :height="600" :width="600" :resizable="true">
        <div class="p3">
          <iframe src="https://vid.me/e/jQgQ?stats=1"
                  width="535"
                  height="300"
                  frameborder="0"
                  allowfullscreen
                  webkitallowfullscreen
                  mozallowfullscreen
                  scrolling="no"></iframe>
        </div>
      </modal>

      <div class="mt3">
        <div class="inline-block mt2">
          <button-component color="blue" @click="$router.push({ name: 'play' })">Start playing</button-component>
        </div>
        <div class="inline-block">
          <button-component @click="$modal.show('explanation')">How?</button-component>
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
  }
</script>
