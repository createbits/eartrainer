import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from './components/pages/HomePage.vue'
import Play from './components/pages/PlayPage.vue'

Vue.use(VueRouter)

const routes = [
  { name: 'home', path: '/', component: Home },
  { name: 'play', path: '/play', component: Play },
]

export const router = new VueRouter({
  routes,
})
