import Vue from 'vue'
import App from './App.vue'

import Home from './components/Home.vue'
import Events from './components/Events.vue'

import VueRouter from 'vue-router'

Vue.use(VueRouter)

let router = new VueRouter({ routes: [
	{ path: "/", component: Home },
	{ path: "/events", component: Events }
]})


new Vue({
  el: '#app',
  template: '<App/>',
  router: router,
  components: { App }
})
