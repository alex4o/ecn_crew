<template>
	<div class="content">
		<h2>Препоръчани</h2>
		<section>

		
			<div class="image image-big">
			</div>

			
			<router-link :to="'/article/' + item" v-for='item in ["заглавие 1","заглавие 2","заглавие 3","заглавие 4"]' class="box">

				<div class="image"></div>
				<div class="text">{{item}}</div>
			</router-link >
			
		</section>

		<h2>Нови</h2>
		<section>

			<div class="image image-big">
			</div>

			
			<router-link :to="'/article/' + item" v-for='item in ["заглавие 1","заглавие 2","заглавие 3","заглавие 4"]' class="box">
				<div class="image"></div>
				<div class="text">{{item}}</div>
			</router-link >
			

		</section>
	</div>
</template>

<script>
export default {
	name: 'home',

	components: {
		
	},
	mounted: function() {
		this.$emit("bg")
	}
}
</script>

<style scoped lang="stylus">
@import "../var.styl"

iw = image-width

.content
	position relative
	
	for i in 1..4
		@media (min-width: (i * iw ) px)
			width: image-width * i
			
	// width:  * column-count
	margin-left auto
	margin-right auto
	// height calc(100vh - 100px)
	
	// top: 200px
	// aligin-self center
	
	section
		display: flex
		flex-wrap: wrap
		.box
			display flex
			width: image-width
			flex-direction: column
			box-sizing border-box
			text-decoration: none
			
			.text
				flex 0
				text-align center
				line-height text-size
				font-size 1.25em
				// border-left 1px solid black
				// border-right 1px solid black
				// border-bottom 1px solid black
				// background lighten(#1FD, 32)
				margin: 0 image-margin image-margin image-margin
				color black
				text-decoration: none
				
				
		.image
			background: url(/../static/default-placeholder-1024x1024.png)
			background-position: center !important
			background-origin: border-box !important
			background-size: cover !important
			background-repeat: no-repeat
			height: image-height
			
			margin: image-margin image-margin 0 image-margin
			
			
			&-big
				width: (image-width - image-margin)*2
				height: image-height + text-size 

</style>
