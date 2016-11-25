import Vue from 'vue'
import App from './App.vue'

import Home from './components/Home.vue'
import Events from './components/Events.vue'
import Art from './components/Art.vue'
import Shows from './components/Shows.vue'

import VueRouter from 'vue-router'
import PouchDB from "pouchdb"




class VuePouch {
	constructor(dbs = [], url = location.hostname){
		this.url = url

		dbs.forEach((db) => {
			this[db] = this.lazy(() => {
				return new PouchDB(`http://${url}:5984/${db}`);
			}, db)
		})
	}

	lazy(func, name){
		return function() { 
			let res = func()
			this[name] = function() {
				return res
			}
			return res
		}

	}

	install(Vue, options) {
		Vue.prototype.$pouchDB = this
	}
}

Vue.use(VueRouter)

let vp = new VuePouch(["events", "art", "music", "shows"])
console.log(vp)

Vue.use(vp)

let router = new VueRouter({ routes: [
	{ path: "/", component: Home },
	{ path: "/events", component: Events },
	{ path: "/art", component: Art },
	{ path: "/shows", component: Shows }
]})


new Vue({
  el: '#app',
  template: '<App/>',
  router: router,
  components: { App }
})
