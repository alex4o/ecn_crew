<template>

<!-- 	<waterfall :line="line" :line-gap="300" :min-line-gap="200" :max-line-gap="400" :watch="items" align="left" class="page">

		<waterfall-slot	v-for="(item, index) in items"
			:width="item.width"
			:height="item.height"
			:order="index"
			:key="item._id"
		>
		<div class="item" :style="{ background: 'url(' + url + ':5984/shows/' + item._id + '/' + Object.keys(item._attachments)[0] + ')' }">
		<div class="item" >

			{{item.title}}
		</div>
		</waterfall-slot>
	</waterfall> -->
<div class="page">
	<div class="head">
		<div class="ev">Музика</div>
		<input type="text" class="search" placeholder="Търсене">
	</div>

	<div class="gallery " ref="gallery">
		
		<div v-for="item in items" :class="['item', { long : item.long }]" >
			<div class="bg-image" :style="{ background: item.img || 'blue' }">

			</div>
			<div class="text">
				<div class="title">{{item.title}}</div>
				<div class="content">{{item.content || "Няма съдържание"}}</div>

			</div>

		</div>
	</div>			
</div>
</template>

<script>
import Waterfall from 'vue-waterfall/lib/waterfall'
import WaterfallSlot from 'vue-waterfall/lib/waterfall-slot'
import Masonry from 'masonry-layout'
import Packery from 'packery'
let Isotope = require('isotope-layout')


let music 
let changes
let masonry

export default {
	name: 'music',

	components: {
		Waterfall,
		WaterfallSlot
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
			items: []
		}
	},
	created: function() {
		music = this.$pouchDB.music()
		this.url = 'http://' + this.$pouchDB.url
		let minWidth = 33.3
		let margin = 10

		changes = music.changes({live: true}).on("change", () => {
			console.log("change")
			
			music.query("js/sort-date", {include_docs: true})
			.then((result) => {
				// console.log(result)
				// console.log("update",result.rows)
				this.items =  result.rows.map(doc => {
					let res = doc.doc
					
					if(res._attachments){
						res.img = "url(" + this.url + ':5984/music/' + res._id + '/' + Object.keys(res._attachments)[0] + ')'
					}



					// console.log(res)
					return res
				})

				this.$nextTick(() => { // the new note hasn't been rendered yet, but in the nextTick, it will be rendered
					masonry.reloadItems()
					masonry.layout()
				})
				// this.$nextTick(() => { // the new note hasn't been rendered yet, but in the nextTick, it will be rendered
				// 	masonry.reloadItems()
				// 	masonry.layout()
				// })
					// handle result
			}).catch(function (err) {
				console.log(err);
			});
		

		})

		window.onresize = () => {
			console.log("resize")
			setTimeout(() => {
				masonry.layout()
			}, 1000)
			masonry.layout()

		}
	},
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
