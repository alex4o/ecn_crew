<template>
	<div class="page">
			<a href="/#/art/gallery" >Галерия</a>
			<a href="/#/art/literaure">Литература</a>
	</div>
</template>

<script>


// import Masonry from 'masonry-layout'
// let Isotope = require('isotope-layout')

// require('isotope-packery')

let art = null
let changes = null

let masonry = null

export default {
	name: 'gallery',
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

	},
	mounted: function() {
		// console.log(this)
		// console.log(this.$emit)
		//this.$emit('bg', "red")
	},
	methods: {

		
	},
	created: function() {

	},
	mounted() {


	},
	beforeDestroy: () => {
	
	}
}
</script>

<style scoped lang="stylus">
.page 
	display: flex
	
	> a 
		display: block
		flex: 1
		text-align: center
		height: 100vh
		line-height: 100vh
		color: white
		font-size: 2em
		background-color: rgba(0,0,0,0.5)
		&:hover 
			background-color: rgba(0,0,0,0.4)
			
		

</style>
