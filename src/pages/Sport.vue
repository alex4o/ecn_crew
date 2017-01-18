<template>

<div class="page">
	<div class="head">
		<div class="ev">Спорт</div>
		<input type="text" class="search" placeholder="Търсене">
	</div>

	<div class="gallery" ref="gallery">
		
		<div v-for="item in items" :class="['item', { long : item.long }]" @click="$router.push({ name: 'sport', params: { id: item._id }})">
			<div class="bg-image" :style="{ background: 'url(' + item.thumb || 'blue' + ')' }">

			</div>
			<div class="text">
				<div class="title">{{item.title}}</div>
				<div class="content">{{item.content || "Няма съдържание"}}</div>

			</div>

		</div>
	</div>	

	<modal ref="modal" :content="open.content_long" :title="open.title" :url="open.image" :video="open.video" @close="close" :open="modal.open"/>

</div>
</template>

<script>
import Masonry from 'masonry-layout'
import Packery from 'packery'
import Modal from '../components/ModalPage'	  


let Isotope = require('isotope-layout')
  
import axios from 'axios'

let sport 
let changes
let masonry

export default {
	name: 'sport',
	methods: {
		get() {
			sport.query("js/sort-date", {include_docs: true})
			.then((result) => {

				this.items =  result.rows.map(doc => {
					let res = doc.doc
					


					return this.docToRow(res)
				}).reverse()

				this.$nextTick(() => { // the new note hasn't been rendered yet, but in the nextTick, it will be rendered
					masonry.reloadItems()
					masonry.layout()
				})

			}).catch(function (err) {
				console.log(err);
			});
		},
		docToRow(res){
			let attachments = Object.keys(res._attachments || {})

			//console.log(res.files)

			// console.log(row, res)
			if(attachments.length > 0){
				res.files = _.fromPairs(attachments.map(file => file.split(".")))


				res.thumb = this.url + ':5984/sport/' + res._id + '/thumb.' + res.files["thumb"]
				res.cover = this.url + ':5984/sport/' + res._id + '/cover.' + res.files["cover"]
				res.article = this.url + ':5984/sport/' + res._id + '/article.md'
			}
			res.files = _.fromPairs(Object.keys(res._attachments).map(file => file.split(".")))

			return res

		},
		async show(item) {
			let content

			try{
				content = await axios.get(item.article)
				item.content_long = content.data
				
			}catch(err){
				console.log(err)
				item.content_long = "Няма описание"
			}
			
			item.image = item.cover
				//console.log(this.$refs.modal)


			this.open = item
			this.modal.open = true
		},
		close() {
			this.$router.push({ name: 'sport', params: { id: undefined }})
			// this.modal.open = false

		},
		async load(id){
			let doc = await sport.get(id)
			let event = this.docToRow(doc)
			this.show(event)
		}
	},
	watch: {
		"$route": function(to, b){
			//window.e = this

			console.log("To: ", to.params)
			if(to.params.id){
				// console.log("open")
				this.load(to.params.id)
			}else{
				this.modal.open = false
			}
	
		}
	},
	components: {
		Modal
	},
	mounted: function() {
		masonry = new Packery(this.$refs.gallery, {
			itemSelector: '.item',
			percentPosition: true,
			columnWidth: '.item',
			resize: false
		})
	},
	data(){
		return {
			line: 'v',
			items: [],
			open: {
				content_long: ""
			},
			modal: {
				open: false
			}
		}
	},
	created: function() {
		sport = this.$pouchDB.sport()
		this.url = 'http://' + this.$pouchDB.url
		let minWidth = 33.3
		let margin = 10

		changes = sport.changes({live: true, since: "now"}).on("change", () => {
			console.log("change")
			this.get()
		})
		this.get()


		if(this.$route.params.id == null){
			//this.$router.push({ name: 'events', params: { id: "12" }})
			// console.log("path")
			console.log(this.$router)
		}else{
			this.load(this.$route.params.id)
		}


		window.onresize = () => {
			console.log("resize")
			setTimeout(() => {
				masonry.layout()
			}, 1000)
			masonry.layout()

		}
	},
	beforeDestroy: () => {
		changes.cancel()
	}
}
</script>

<style scoped lang="stylus">
.head
	display flex
	justify-content space-araound

.ev
	width 200px
	font-size 2em
	font-family 'Russo One', sans-serif
	flex 1
	color: white


.search
	background-color rgba(0,0,0,0)
	border: none
	flex 4 40vw
	margin-left 20px
	color white
	font-size 2em
	border-bottom 3px solid white
	outline: none;
	font-family sans-serif		

.item
	box-sizing border-box
	// background white
	// position absolute
	// sfloat: left
	height: 266px
	width: 266px
	// display: inline-block
	// float left
	// margin-left 10px
	// margin-top 10px
	&.long
		width: 532px
		

	> .bg-image
		cursor pointer
		
		position absolute
		top 5px
		left 5px
		right 5px
		bottom 5px
		transition all 1s
		background blue
		background-position: center !important
		background-origin: border-box !important
		background-size: cover !important
		background-repeat: no-repeat
	
	> .text 
		cursor pointer
		
		position absolute
		font-family sans-serif
		color white
		padding 10px
		box-sizing border-box
		background rgba(0,0,0, 0.8)
		height 40%
		
		bottom: 5px
		left 5px
		right 5px
		
		> .title 
			font-size 1.3em
			

.page 
	width 800px
	
	@media screen and (max-width: 1064px) {
		width 800px	
	}
	
	@media screen and (min-width: 1064px) {
		width 1064px	
	}
	
	@media screen and (min-width: 1330px) {
		width 1330px	
	}


	margin-left auto
	margin-right auto

</style>
