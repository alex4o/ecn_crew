<template>

<!-- 				<waterfall :line="line" :line-gap="400" :watch="items" align="center" class="waterfall">
					each component is wrapped by a waterfall slot
					<waterfall-slot
						v-for="(item, index) in items"
						:width="item.width"
						:height="item.height"
						:order="index"
						:key="item._id"
					>
					<div class="item" :style="{ background: 'url(' + url + ':5984/art/' + item._id + '/' + Object.keys(item._attachments)[0] + ')' }">
						<img v-if="!item._attachments" src="../../static/default-placeholder-1024x1024.png">
						<img v-else v-bind:src="url + ':5984/art/' + item._id + '/' + Object.keys(item._attachments)[0] ">
					{{item.text}}
					</div>
					</waterfall-slot>
				</waterfall>

 -->
	<div class="gallery" ref="gallery">
		<!-- <div v-for="item in items" class="item" :style="{ background: 'url(' + url + ':5984/art/' + item._id + '/' + Object.keys(item._attachments)[0] + ')'}"> -->
		<div v-for="item in items" class="item">		
			<img v-if="!item._attachments" src="../../static/default-placeholder-1024x1024.png">
			<img v-else v-bind:src="url + ':5984/art/' + item._id + '/' + Object.keys(item._attachments)[0] ">
		</div>
	</div>			
</template>

<script>

import Masonry from 'masonry-layout'
let Isotope = require('isotope-layout')

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
		masonry = new Masonry(this.$refs.gallery, {
			itemSelector: '.item',
			// columnWidth: 300,
			gutter: 16,
			fitWidth: false,
			layoutMode: 'masonry'
		})

	
		// console.log(art)
		

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

				this.$nextTick(() => { // the new note hasn't been rendered yet, but in the nextTick, it will be rendered
					masonry.reloadItems()
					masonry.layout()
				})
					// handle result
			}).catch(function (err) {
				console.log(err);
			});
		

		})
	},
	beforeDestroy: () => {
		// console.log("bDest:", this)
		changes.cancel()
	}
}
</script>

<style scoped lang="stylus">

.waterfall 
	overflow visible !important

.item
	background white
	padding 10px
	// sfloat: left
	height: 400px
	// position absolute
	// top 10px
	// left 10px
	// right 10px
	// bottom 10px
	background-position: center !important
	background-origin: border-box !important
	background-size: cover !important
	background-repeat: no-repeat
	img
		height 400px  

	
	

#pages
	display: block
	// background: 
	height: 60vh
	width: 70vw
	margin-top: 10vh
	margin-left: 15vw
	margin-right: 15vw

</style>
