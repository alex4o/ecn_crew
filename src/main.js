import Vue from 'vue'
import App from './App.vue'

import Home from './pages/Home.vue'
import Events from './pages/Events.vue'
import Art from './pages/Art.vue'
import Shows from './pages/Shows.vue'
import Music from './pages/Music.vue'
import Sport from './pages/Sport.vue'

import VueRouter from 'vue-router'
import PouchDB from "pouchdb"

import StdNav from './components/StdNav'
import HomeNav from './components/HomeNav'

require("normalize.css")


console.log(process.env)

class VuePouch {
	constructor(dbs = [], url = location.hostname) {
		this.url = url

		dbs.forEach((db) => {
			this[db] = this.lazy(() => {
				return new PouchDB(`http://${url}:5984/${db}`);
			}, db)
		})
	}

	lazy(func, name) {
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

let vp = new VuePouch(["events", "art", "music", "shows", "sport"], "ecncrew.ml")
console.log(vp)

Vue.use(vp)

let router = new VueRouter({
	routes: [{
		path: "/",
		components: {
			default: Home,
			nav: HomeNav
		}
	}, {
		path: "/events",
		components: {
			default: Events,
			nav: StdNav
		}
	}, {
		path: "/art",
		components: {
			default: Art,
			nav: StdNav
		}
	}, {
		path: "/shows",
		components: {
			default: Shows,
			nav: StdNav
		}
	}, {
		path: "/music",
		components: {
			default: Music,
			nav: StdNav
		}
	}, {
		path: "/sport",
		components: {
			default: Sport,
			nav: StdNav
		}
	}, ]
})

new Vue({
	el: '#app',
	template: '<App/>',
	router: router,
	components: {
		App
	}
})

