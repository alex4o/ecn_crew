<template>

<div class="page">
	<div class="head">
		<div class="ev">Музика</div>
		<input type="text" class="search" placeholder="Търсене">
	</div>

	<div class="gallery " ref="gallery">
		
		<div v-for="item in items" :class="['item ', { long : item.long }]" @click="show(item)">
			<div class="bg-image" :style="{ background: 'url(' + item.thumb + ')' }"></div>
			<div class="text">
				<div class="title">{{item.title}}</div>
				<div class="content">{{item.content || "Няма съдържание"}}</div>
			</div>

		</div>
	</div>			

	<modal ref="modal" :content="open.content_long" :title="open.title" :url="open.image" />

</div>


</template>

<script>
import Masonry from 'masonry-layout'
import Packery from 'packery'
import Modal from '../components/ModalPage'	  


let Isotope = require('isotope-layout')	  

import _ from "lodash"
import axios from 'axios'

let music 
let changes
let masonry

export default {
	name: 'music',
	methods: {
		get() {
			music.query("js/sort-date", {include_docs: true})
			.then((result) => {
		
				this.items =  result.rows.map(doc => {
					let res = doc.doc
					

					res.files = _.fromPairs(Object.keys(res._attachments).map(file => file.split(".")))

					res.thumb = this.url + ':5984/music/' + res._id + '/thumb.' + res.files["thumb"]
					res.cover = this.url + ':5984/music/' + res._id + '/cover.' + res.files["cover"]
					res.article = this.url + ':5984/music/' + res._id + '/article.md'

					return res
				}).reverse()

				this.$nextTick(() => { // the new note hasn't been rendered yet, but in the nextTick, it will be rendered
					masonry.reloadItems()
					masonry.layout()
				})
	
			}).catch(function (err) {
				console.log(err);
			});
		},
		async show(item) {
			let content = await axios.get(item.article)
			
			item.image = item.cover
			item.content_long = content.data
				//console.log(this.$refs.modal)


			this.open = item
			this.$refs.modal.o = true
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
			resize: true
		})
	},
	data(){
		return {
			line: 'v',
			items: [],
			open: {
				content_long: ""
			}
		}
	},
	created: function() {
		music = this.$pouchDB.music()
		this.url = 'http://' + this.$pouchDB.url
		let minWidth = 33.3
		let margin = 10

		changes = music.changes({live: true, since: "now"}).on("change", () => {
			console.log("change")
			this.get()
		})
		this.get()

		window.onresize = _.debounce(() => {
			console.log("resize")
			setTimeout(() => {
				masonry.layout()
			}, 100)
			masonry.layout()

		}, 1000)
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
		background green
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
