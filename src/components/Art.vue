<template>

			<div id="pages">
				<waterfall :line="line" :line-gap="300" :watch="items" align="center">
					<!-- each component is wrapped by a waterfall slot -->
					<waterfall-slot
						v-for="(item, index) in items"
						:width="item.width"
						:height="item.height"
						:order="index"
						:key="item.id"
					>
					<div class="item">{{item.text}}</div>
						<!--
							your component
						-->
					</waterfall-slot>
				</waterfall>
			</div>
</template>

<script>
import Waterfall from 'vue-waterfall/lib/waterfall'
import WaterfallSlot from 'vue-waterfall/lib/waterfall-slot'


export default {
	name: 'art',
	data: () => {
		return {
			line: 'h',
			items: [
				{width: 400, height: 200, id: 0, text: "Hello"},
				{width: 200, height: 200, id: 1, text: "Hello"},
				{width: 200, height: 200, id: 2, text: "Hello"},
				{width: 200, height: 200, id: 3, text: "Hello"},
				{width: 200, height: 200, id: 4, text: "Hello"},
				{width: 200, height: 200, id: 5, text: "Hello"},
				{width: 200, height: 200, id: 6, text: "Hello"},
				{width: 200, height: 200, id: 7, text: "Hello"},
				{width: 200, height: 200, id: 8, text: "Hello"},
				{width: 200, height: 200, id: 9, text: "Hello"},
				{width: 200, height: 200, id: 10, text: "Hello"},
				{width: 200, height: 200, id: 11, text: "Hello"},

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
	}
}
</script>

<style scoped lang="stylus">

.item
	background white
	padding 10px
	position absolute
	top 10px
	left 10px
	right 10px
	bottom 10px

	
	

#pages
	display: block
	// background: 
	height: 60vh
	width: 70vw
	margin-top: 10vh
	margin-left: 15vw
	margin-right: 15vw

</style>
