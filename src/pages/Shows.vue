<template>

	<waterfall :line="line" :line-gap="300" :min-line-gap="200" :max-line-gap="400" :watch="items" align="left" class="waterfall">
		<!-- each component is wrapped by a waterfall slot -->
		<waterfall-slot
			v-for="(item, index) in items"
			:width="item.width"
			:height="item.height"
			:order="index"
			:key="item._id"
		>
		<div class="item" :style="{ background: 'url(' + url + ':5984/shows/' + item._id + '/' + Object.keys(item._attachments)[0] + ')' }">
	<!-- 		<img v-if="!item._attachments" src="../../static/default-placeholder-1024x1024.png">
			<img v-else v-bind:src="url + ':5984/art/' + item._id + '/' + Object.keys(item._attachments)[0] "> -->
			{{item.text}}
		</div>
		</waterfall-slot>
	</waterfall>

</template>

<script>
import Waterfall from 'vue-waterfall/lib/waterfall'
import WaterfallSlot from 'vue-waterfall/lib/waterfall-slot'

let shows 
let changes

export default {
	name: 'home',

	components: {
		Waterfall,
		WaterfallSlot
	},
	mounted: function() {
		
	},
	created: function() {
		shows = this.$pouchDB.shows()
		this.url = 'http://' + this.$pouchDB.url

		changes = shows.changes({live: true}).on("change", () => {
			console.log("change")
			
			shows.query("js/sort-date", {include_docs: true})
			.then((result) => {
				// console.log(result)
				// console.log("update",result.rows)
				this.items =  result.rows.map(doc => {
					let res = doc.doc
					res.width = 100
					res.height = 100
					// console.log(res)
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
}
</script>

<style scoped lang="stylus">
.item
	background white

</style>
