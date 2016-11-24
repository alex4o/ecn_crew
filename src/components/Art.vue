<template>

				<waterfall :line="line" :line-gap="400" :watch="items" align="center" class="waterfall">
					<!-- each component is wrapped by a waterfall slot -->
					<waterfall-slot
						v-for="(item, index) in items"
						:width="item.width"
						:height="item.height"
						:order="index"
						:key="item._id"
					>
					<div class="item" :style="{ background: 'url(' + url + ':5984/art/' + item._id + '/' + Object.keys(item._attachments)[0] + ')' }">
						<!-- <img v-if="!item._attachments" src="../../static/default-placeholder-1024x1024.png"> -->
						<!-- <img v-else v-bind:src="url + ':5984/art/' + item._id + '/' + Object.keys(item._attachments)[0] "> -->
					<!-- {{item.text}} -->
					</div>
					</waterfall-slot>
				</waterfall>
			
</template>

<script>
import Waterfall from 'vue-waterfall/lib/waterfall'
import WaterfallSlot from 'vue-waterfall/lib/waterfall-slot'

let art = null
let changes = null

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

		changes = art.changes({live: true}).on("change", () => {
			art.allDocs({
				include_docs: true
			}).then((result) => {
				// console.log("update",result.rows)
				this.items =  result.rows.map(doc => {
					let res = doc.doc
					// console.log(res)
					return res
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
	position absolute
	top 10px
	left 10px
	right 10px
	bottom 10px
	background-position: center !important
	background-origin: border-box !important
	background-size: cover !important
	background-repeat: no-repeat

	
	

#pages
	display: block
	// background: 
	height: 60vh
	width: 70vw
	margin-top: 10vh
	margin-left: 15vw
	margin-right: 15vw

</style>
