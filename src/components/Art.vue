<template>

 			<div id="pages">
				<div class="page">


				</div>
			</div>
</template>

<script>
export default {
	name: 'art',

	components: {
		
	},
	mounted: function() {
		// console.log(this)
		// console.log(this.$emit)
		this.$emit('bg', "red")
	}
}
</script>

<style scoped lang="stylus">

#pages > .page 
	display: block
	background: pink
	height: 60vh
	width: 60vw
	margin-top: 10vh
	margin-left: 20vw
	margin-right: 20vw

</style>
