import Vue from 'vue'
import 'basscss/css/basscss.css'
import 'ionicons/dist/css/ionicons.css'
import './styles/ionicons.css'
import './styles/main.scss'
import App from './App.vue'
import { init } from 'playnote'

const app = new Vue({
  el: '#app',
  ...App,
})

init('/mp3/ps.mp3').then(() => app.isLoaded = true)
