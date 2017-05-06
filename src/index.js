import Vue from 'vue'
import vmodal from 'vue-js-modal'
import 'basscss/css/basscss.css'
import 'ionicons/dist/css/ionicons.css'
import './styles/ionicons.css'
import './styles/main.scss'
import App from './App.vue'
import { router } from './router.js'
import { init } from 'playnote'

Vue.use(vmodal)

const app = new Vue({
  el: '#app',
  router,
  ...App,
})

init('/mp3/ps.mp3').then(() => app.isLoaded = true)
