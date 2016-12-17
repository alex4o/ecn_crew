<template>
		<div id="pages">
			<div class="page">
				<div class="head">
					<div class="ev">Събития</div>
					<input type="text" class="search" placeholder="Търсене" v-model="search" debounce="500">
				</div>
				
				<div class="card" v-for="event in events"  @click="show(event)">
					
					<img v-if="!event._attachments" src="../../static/default-placeholder-1024x1024.png">
					<img v-else v-bind:src="url + ':5984/events/' + event._id + '/' + Object.keys(event._attachments)[0] ">
					<div class="content">
						<h2>{{event.title}}</h2>
						<p>
						{{event.content}}
						</p>
						<div class="bot">
							{{event.when}} - {{event.where}}
						</div>
					</div>
				</div>
			</div>

			<modal :show="modal.open" @close="close" class="modal">
				Еби са
			</modal>
		</div>
</template>

<script>
require('es6-promise').polyfill();

let axios = require('axios');
import _ from "lodash"
import Modal from '../components/Modal'	  

let events = null
let changes = null

export default {
	name: 'home',
	data:() => {
		return {
			url: "",
			search: "",
			events: [],
			modal: {
				open: false,
				width: 0,
				height: 0
			}
		}
	},
	watch: {
		search: _.debounce(async function(value){
			// console.log(value, this)
			value = value.trim()

			if(value.length == 0){
				// let date = new Date()

				// let result = await events.query("test1/new-view", {include_docs: true, startkey: [date.getDate(),date.getMonth() + 1, date.getFullYear()] })
				// this.events =  result.rows.map(this.docToEvent)
				this.getNew()
				
				return

			}
			value = value.split(" ").map(e => `${e}* OR ${e}~`).join(" ")
			axios.get("http://ecncrew.ml/fts/local/events/_design/foo/by_title", {
				params: {
					q: value,
					stale: "ok"
				}
			}).then((e) => {
				events.bulkGet({docs: e.data.rows}).then((res) => {
					this.events = res.results.map((row) => this.docToEvent(row.docs[0].ok)) 
				})
			})
		}, 300)
	},
	methods: {
		show(event) {
			this.modal.open = true
		},
		close(){
			this.modal.open = false
		},
		docToEvent(row){
			let res = row.doc
			res.thumbURL = this.url + ':5984/events/' + res._id + '/' + Object.keys(res._attachments)[0]
			return res
		},
		getNew() {
			let date = new Date()

			events.query("test1/new-view", {include_docs: true, startkey: [date.getDate(),date.getMonth() + 1, date.getFullYear()] })
			.then((result) => {
				this.events =  result.rows.map(this.docToEvent)
			}).catch(function (err) {
				console.log(err);
			});
		}
	},
	components: {
		Modal
	},
	created: function() {
		events = this.$pouchDB.events()
		this.url = 'http://' + this.$pouchDB.url

		changes = events.changes({live: true, since: "new"}).on("change", (e) => {
			this.getNew()
		})

		this.getNew()
	},
	mounted: function () {
		// console.log("mounted")

	},
	beforeDestroy: () => {
		// console.log("bDest:", this)
		changes.cancel()
	}
}


</script>

<style scoped lang="stylus">
.modal
	color black

.card
	background-color #FFF
	color black
	margin 10px
	// padding 20px
	text-align left
	// clear both
	// display flex
	positon relative
	font-size 0

	img 
		// display inline-block
		width 200px
		height 200px
		// flex 0 200px
		// vertical-align middle
		display inline-block
		vertical-align middle
		
		
	.content
		display inline-flex
		// display flex
		flex-direction column
		vertical-align middle
		padding 20px 20px 0px 20px
		width calc(100% - 205px)
		height 200px
		box-sizing border-box
		font-size 12pt
		h2 
			margin-bottom 10px
			flex 0 30px
			font-size 1.5em
		p
			flex 1
			font-size 1em
			
			
		.bot 
			flex 0 22px
			font-weight 400
			padding-top 2px
			border-top 1px dashed #444
			color rgba(44,44,44,.5)
			font-size 0.9em
			

		// display inline-block
		

.head
	display flex
	justify-content space-araound

.ev
	width 200px
	font-size 2em
	font-family 'Russo One', sans-serif
	flex 1


.search
	background-color rgba(0,0,0,0)
	border: none
	flex 5 50vw
	margin-left 20px
	color white
	font-size 2em
	border-bottom 3px solid white
	outline: none;
	font-family sans-serif		

#pages {
	color: white;
	text-align: center;
	
	&  > .page {
		/*display: inline-block;*/
		
		display: block;
		// height: 60vh;
		width: 60vw;
		margin-top: 10vh;
		margin-left: auto;
		margin-right: auto;
		
		@media screen and (max-width: 1200px) {
			width: 80vw;
		}
		
		@media screen and (max-width: 800px) {
			width: 90vw;
		}
		/*border: 5px black solid;*/
		/*box-shadow: 0px 0px 20px black;*/
		/*background-color: grey;*/
	}

}

h2 {
	font-size: 2em;

}

#pages h1 {
	font-weight: 900;
	font-size: 4em;
	color: white;
	font-family: 'Russo One', sans-serif;

	/*font-family: sans-serif;*/
	text-align: center;
	/*width: 700px;*/

	margin: auto;
}

</style>
