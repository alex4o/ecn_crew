<template>
	<div class="content">
	
		

		<article>
			<h1>
			Туй е заглавието!
			</h1>

			<img src="http://placehold.it/1920x1080">
			
			<p>
			Туй е текста Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
			tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
			quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
			consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
			cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
			proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
			</p>

			<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Explicabo ex voluptates dolorum necessitatibus reprehenderit ducimus rerum quae unde aut, debitis fuga minima alias quod incidunt doloribus iure odit molestiae, iste.</p>

			<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Explicabo ex voluptates dolorum necessitatibus reprehenderit ducimus rerum quae unde aut, debitis fuga minima alias quod incidunt doloribus iure odit molestiae, iste.</p>

			<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Explicabo ex voluptates dolorum necessitatibus reprehenderit ducimus rerum quae unde aut, debitis fuga minima alias quod incidunt doloribus iure odit molestiae, iste.</p>
			
<!-- 			<div class="comments">
				<div class="comment" v-for="item in [{user: 'pe4ka', text: 'oasdf'}, {}, {}, {}]">
					<img src="http://placehold.it/50x50">
					<div class="comment text">{{text}}</div>
				</div>

			</div> -->
		</article>
		<aside>
			<div class="category">
				#категория
			</div>
			<ul>
				<li>Новина 1</li>
				<li>Новина 2</li>
				<li>Новина 3</li>
				<li>Новина 4</li>
				<li>Новина 5</li>
			</ul>
		</aside>

	</div>
</template>

<script>

export default {
	components: {

	},
	async mounted() {


	},
	methods: {

	},
	data: () => { 
		return {}
	}
}

</script>

<style lang="stylus" scoped>
@import "../var.styl"


.content
	display: flex
	// margin: 5vw 0px 0vw 0
	margin-left: 5vw
	margin-right: 5vw
	margin-top: 10px
	
	@media (max-width: 600px)
		flex-direction: column

	article
		flex: 2

		@media (max-width: 800px)
			flex: 3
			

		
		h1
			text-align center
		
		p
			padding 0px 15px 0px 15px 

		// width: 800px
		> img
			width: 100%
			display: block
			
		// .comments
		// 	display: flex
		// 	flex-direction: column
			
		// 	> .comment 
		// 		display: flex
		// 		flex-direction: row


	aside
		flex 1
		> .category
			font-size 2em
			text-align center
			border-bottom 2px solid black
			margin 20px
			
		> ul > li
			margin 10px

</style>
