<template>

	<div id="radio">
		<div v-on:click="expand" class="bar">
			РАДИО
		</div>
		<div class="content" v-bind:class="{ show: show }">
			<audio src="http://ecncrew.tk:8000/source" controls="controls"></audio>
			
		</div>				
	</div>

</template>

<script>
export default {
	name: 'art',
	data: () => {
		return {
			show: false
		}
	},
	components: {
		
	},
	methods: {
		expand: function () {
			// console.log("Expand")
			this.show = !this.show
		}
	}
}
</script>

<style scoped lang="stylus">

#radio
	position: fixed
	bottom: 0px
	right: 20px
	.bar 
		box-shadow 0px 0px 5px black
		color white
		text-align center
		border-left: 2px solid white
		border-right: 2px solid white
		border-top: 2px solid white
		border-radius 20px 20px 0px 0px
		padding 10px
		font-family: 'Russo One', sans-serif;
		
	.content
		height: 0px
		transition: all .4s cubic-bezier(0, 0, 0.41, 1.03)
		border-left 2px solid white
		border-right 2px solid white

		&.show
			height: 30px
			
		
	// background-color: black

</style>
