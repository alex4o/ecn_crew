<template>

	<waterfall :line="line" :line-gap="300" :min-line-gap="250" :max-line-gap="350" :watch="items" align="left" class="waterfall">
		<!-- each component is wrapped by a waterfall slot -->
		<waterfall-slot
			v-for="(item, index) in items"
			:width="item.width"
			:height="item.height"
			:order="index"
			:key="item._id"
		>
		<div class="item" :style="{ background: 'url(' + url + ':5984/art/' + item._id + '/' + Object.keys(item._attachments)[0] + ')' }">
	<!-- 		<img v-if="!item._attachments" src="../../static/default-placeholder-1024x1024.png">
			<img v-else v-bind:src="url + ':5984/art/' + item._id + '/' + Object.keys(item._attachments)[0] "> -->
		{{item.text}}
		</div>
		</waterfall-slot>
	</waterfall>


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
			items: [
			
			]
		}
	},
	components: {
		Waterfall,
		WaterfallSlot
	},
	mounted: function() {
		// console.log(this)
		// console.log(this.$emit)
		//this.$emit('bg', "red")
	},
	created: function() {
		art = this.$pouchDB.art()
		this.url = 'http://' + this.$pouchDB.url


	},
	mounted() {
		// masonry = new Masonry(this.$refs.gallery, {
		// 	layoutMode: 'masonry',
		// 	itemSelector: '.item',
		// 	// columnWidth: 300,
		// 	gutter: 16,

		// })

	
		// console.log(art)
		this.$emit('bg', "black")
		

		changes = art.changes({live: true}).on("change", () => {
			console.log("change")
			
			
			art.allDocs({
				include_docs: true
			}).then((result) => {
				// console.log(result)
				// console.log("update",result.rows)
				this.items =  result.rows.map(doc => {
					let res = doc.doc
					// console.log(res)
					return res
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
	},
	beforeDestroy: () => {
		// console.log("bDest:", this)
		this.$emit('bg', "url(../static/background.jpg)")
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
	
	top 10px
	left 10px
	right 10px
	bottom 10px
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

	
	

#pages
	display: block
	// background: 
	height: 60vh
	width: 70vw
	margin-top: 10vh
	margin-left: 15vw
	margin-right: 15vw

</style>
