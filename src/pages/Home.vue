<template>
	<div class="content">
		<h2>Препоръчани</h2>
		<section class="featured">

		
			<router-link :to="'/article/' + data.featured[0].id" class="image image-big">

			</router-link>

			
			<router-link :to="'/article/' + item.id" v-for='item in data.featured.slice(1,5)' class="item featured">
				<div class="image"></div>

				<div class="text">
					<div class="under">Местоположение | {{moment(item.created)}}</div>
					<h3>{{item.title}}</h3>
				</div>
			</router-link >
			
		</section>

		<h2>Нови</h2>
		<section class="new">

			
			<router-link :to="'/article/' + item.id" v-for='item in data.latest' class="item new">
				<div class="image"></div>
				<div class="text"><h3>{{item.title}}</h3></div>
			</router-link >
			

		</section>
	</div>
</template>

<script>
import axios from "axios"
import moment from "moment"

export default {
	name: 'home',
	data: () => {
		return {
			data: {
				featured: [
				{id: -1}],
				latest: []
			}
		}
	},
	components: {
		
	},
	methods: {
		moment
	},
	mounted: async function() {
		let res = await axios.post(`http://${location.hostname}:4000/graphql`,  
		`	{
				featured {
					id
					title
					created
				}

				latest {
					id
					title
				}
			}
		`)

		//console.log(res.data)
		this.data = res.data.data
	}
}
</script>

<style scoped lang="stylus">
@import "../var.styl"

iw = image-width

.content
	position relative
	
	for i in 1..column-count 
		rest = column-count - i
		@media (min-width: (i * iw ) px) and (max-width: ((i + 1) * iw ) px)
			width: image-width * i
			section .new 
				width: image-width * i
				
			section .new .image
				width: (image-width/rest - image-margin*2/rest) !important
			
	// width:  * column-count
	margin-left auto
	margin-right auto
	// height calc(100vh - 100px)
	
	// top: 200px
	// aligin-self center
	
	section
		width: image-width * column-count
		display: flex
		flex-wrap: wrap
		
		a
			text-decoration: none
			color black

		&.new
			flex-direction column

		a.featured
			display flex
			width: image-width
			flex-direction: column
			box-sizing border-box

			.text
				flex 0
				text-align left
				line-height 1.25em
				font-size 1.25em
				background white
				
				// border-left 1px solid black
				// border-right 1px solid black
				// border-bottom 1px solid black
				// background lighten(#1FD, 32)
				padding text-padding
				box-sizing border-box
				margin: 0 image-margin image-margin image-margin
				
				color black
				text-decoration: none
				
				.under
					text-align left
					font-size: 0.9em
					// margin-left image-margin
						
				h3
					padding 0px !important
					margin 0px !important
					font-weight 200
					
				
			
		a.new
			display flex
			margin-top 20px
			margin-right image-margin
			// background darken(white, 10)
			
			.text
				// align-self: center
				padding-left: 20px				
				background white
				flex 1
			

			.image
				margin 0px
				width: (image-width - image-margin*2)
				margin-left: image-margin
			

		.image
			background: url(http://placehold.it/1920x1080)
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
