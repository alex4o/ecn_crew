<template>
<div>
	<waterfall :line="line" :line-gap="300" :min-line-gap="250" :max-line-gap="350" :watch="items" align="left" class="waterfall">
		<!-- each component is wrapped by a waterfall slot -->
		<waterfall-slot
			v-for="(item, index) in items"
			:width="item.width"
			:height="item.height"
			:order="index"
			:key="item._id"
		>
		<div class="item" :style="{ background: 'url(' + item.thumbURL + ')' }" v-on:click="show(item)">
	<!-- 		<img v-if="!item._attachments" src="../../static/default-placeholder-1024x1024.png">
			<img v-else v-bind:src="url + ':5984/art/' + item._id + '/' + Object.keys(item._attachments)[0] "> -->
		{{item.text}}
		</div>
		</waterfall-slot>
	</waterfall>

	<modal :show="showBigPicture" @close="closeBigPicture" :width="this.open.width" :height="this.open.height">
		<!-- <div id="img" :style="{ background: 'url(' + this.open.url + ')' }" /> -->
		<img v-bind:src="this.open.url">

	</modal>
</div>
<!-- 	<div class="gallery" ref="gallery">
		<div v-for="item in items" class="item" :style="{ background: 'url(' + url + ':5984/art/' + item._id + '/' + Object.keys(item._attachments)[0] + ')'}">
		<div v-for="item in items" class="item" :style="{width: (item.width / item.height) * 300 + 'px', height: 300 + 'px'}">
			<div ></div>
			<img v-if="!item._attachments" src="../../static/default-placeholder-1024x1024.png">
			<img v-else v-bind:src="url + ':5984/art/' + item._id + '/' + Object.keys(item._attachments)[0] ">
		</div>
	</div>			
 -->
</template>

<script>

import Waterfall from 'vue-waterfall/lib/waterfall'
import WaterfallSlot from 'vue-waterfall/lib/waterfall-slot'

import Modal from '../components/Modal'	  
// import Masonry from 'masonry-layout'
// let Isotope = require('isotope-layout')

// require('isotope-packery')

let art = null
let changes = null

let masonry = null

export default {
	name: 'art',
	url: '',
	data: () => {
		return {
			line: 'h',
			showBigPicture: false,
			open: {
				url: "",
				width: "",
				height: 0
			},
			items: [
			
			]
		}
	},
	components: {
		Waterfall,
		WaterfallSlot,
		Modal
	},
	mounted: function() {
		// console.log(this)
		// console.log(this.$emit)
		//this.$emit('bg', "red")
	},
	methods: {
		show(item){
			this.open.url = item.fullURL
			this.showBigPicture = true
			let c1 = 1
			let c2 = 1
			// let c3 = item.height/item.width
			if(item.height > window.innerHeight) {
				 c1 = window.innerHeight/item.height
				 c1 -= 0.1
			}

			if(item.width > window.innerWidth){
				 c2 = window.innerWidth/item.width
				 c2 -= 0.1
			}

			let coef = Math.min(c1,c2)

			this.open.width = (item.width)*coef
			this.open.height = (item.height)*coef

		},
		closeBigPicture() {
			this.showBigPicture = false
		}
	},
	created: function() {
		art = this.$pouchDB.art()
		this.url = 'http://' + this.$pouchDB.url

		changes = art.changes({live: true}).on("change", () => {
			console.log("change")
			
			art.query("js/pictures", {include_docs: true})
			.then((result) => {
				// console.log(result)
				// console.log("update",result.rows)
				this.items =  result.rows.map(doc => {
					let res = doc.doc
					let images = Object.keys(item._attachments)
					res.thumbURL =  url + ':5984/art/' + item._id + '/' + images[0]
					if(images.leength > 1){
						res.fullURL =  url + ':5984/art/' + item._id + '/' + images[1]
					}else{
						res.fullURL =  res.thumbURL

					}
					return res
				}).reverse()

				// this.$nextTick(() => { // the new note hasn't been rendered yet, but in the nextTick, it will be rendered
				// 	masonry.reloadItems()
				// 	masonry.layout()
				// })
					// handle result
			}).catch(function (err) {
				console.log(err);
			});
		

		})
	},
	mounted() {
		// masonry = new Masonry(this.$refs.gallery, {
		// 	layoutMode: 'masonry',
		// 	itemSelector: '.item',
		// 	// columnWidth: 300,
		// 	gutter: 16,

		// })

	
		// console.log(art)
		// this.$emit('bg', "black")
		


	},
	beforeDestroy: () => {
		// console.log("bDest:", this)
		// this.$emit('bg', "url(../static/background.jpg)")
		changes.cancel()
	}
}
</script>

<style scoped lang="stylus">

.waterfall 
	overflow visible !important

.item
	box-sizing border-box
	// background white

	// sfloat: left
	// height: 300px
	position absolute
	
	top 5px
	left 5px
	right 5px
	bottom 5px
	background-position: center !important
	background-origin: border-box !important
	background-size: cover !important
	background-repeat: no-repeat
	img
		height 300px 
		box-sizing border-box

.item:after {
  content: attr(index);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
}

	
img
	width: 100%
	height: 100%
	background-position: center !important
	background-repeat: no-repeat !important
	background-size: contain !important

#pages
	display: block
	// background: 
	height: 60vh
	width: 70vw
	margin-top: 10vh
	margin-left: 15vw
	margin-right: 15vw

</style>
