<template>
	<div class="content">
	
		

		<article>
			<h1>
			{{article.title}}
			</h1>

			<img src="http://placehold.it/1920x1080">
			
			{{article.body}}
			
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
			<div class="category">
				{{article.writer.name}}
			</div>
			<ul>
				<li v-for='item in article.writer.articles'>
					<router-link :to="'/article/' + item.id" class="link">
						{{item.title}}
					</router-link>
				</li>
			</ul>
		</aside>

	</div>
</template>

<script>
import axios from "axios"

async function load(id) {
		let res = await axios.post(`http://${location.hostname}:4000/graphql`,  
		`	{
				article(id: ${id}) {
					title
					body
					writer {
						name
						articles {
							id
							title
						}
					}
				}
			}
		`)
		if(res.data.error) {
			console.log(res.data.error)
		}
		return res.data.data
}

export default {
	components: {

	},
	async mounted() {
		// console.log(this)


		// console.log(res.data)

		let {article} = await load(this.$route.params.id)
		this.article = article

	},
	methods: {

	},
	watch: {
		'$route': async function (to, from) {
			let {article} = await load(to.params.id)
			this.article = article
		}
	},
	route: {
   		canReuse: false
	},
	data: () => { 
		return {
			article: {
				title: "",
				body: "",
				writer: {
					name: "",
					articles: []
				}
			}

		}
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
