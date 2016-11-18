<template>
		<div id="pages">
			<div class="page">
				<div class="head">
					<div class="ev">Events</div>
					<input type="text" class="search" placeholder="Search">
				</div>
				
				<div class="card" v-for="event in events">
					
					<img v-if="!event._attachments" src="../../static/default-placeholder-1024x1024.png">
					<img v-else v-bind:src="url + ':5984/events/' + event._id + '/' + Object.keys(event._attachments)[0] ">
					<div class="content">
						<h2>{{event.title}}</h2>
						<p>{{event.content}}</p>
						<div class="bot">
							{{event.when}} - {{event.where}}
						</div>
					</div>
				</div>
			</div>
		</div>
</template>

<script>
let events = null
let changes = null

export default {
	name: 'home',
	data:() => {
		return {
			url: "",
			events: []
		}
	},
	components: {
		
	},
	created: function() {
		events = this.$pouchDB.events()
		this.url = 'http://' + this.$pouchDB.url

		changes = events.changes({live: true}).on("change", () => {
			events.allDocs({
				include_docs: true
			}).then((result) => {
				// console.log("update",result.rows)
				this.events =  result.rows.map(doc => {
					let res = doc.doc
					// console.log(res)
					return res
				})

				// handle result
			}).catch(function (err) {
				console.log(err);
			});
		})
// feign sleep - when you pretend
	},
	mounted: function () {
		// console.log("mounted")

	},
	beforeDestroy: () => {
		// console.log("bDest:", this)
		changes.cancel()
	}
}
</script>

<style scoped lang="stylus">
.card
	background-color #FFF
	color black
	margin 10px
	// padding 20px
	text-align left
	// clear both
	display flex
	positon relative

	img 
		// display inline-block
		width 200px
		height 200px
		flex 0 200px
		// vertical-align middle
		// float left
			
		
	.content
		display flex
		flex-direction column
		margin 20px 20px 0px 20px
		width 100%
		
		h2 
			margin-bottom 10px
			flex 0 30px
		p
			flex 1
			
		.bot 
			flex 0 22px
			font-weight 400
			padding-top 2px
			border-top 1px dashed #444
			color rgba(44,44,44,.5)

		// display inline-block
		

.head
	display flex
	justify-content space-araound

.ev
	width 200px
	font-size 2em
	font-family 'Russo One', sans-serif
	flex 1


.search
	background-color rgba(0,0,0,0)
	border: none
	flex 5 50vw
	margin-left 20px
	color white
	font-size 2em
	border-bottom 3px solid white
	outline: none;
	font-family sans-serif		

#pages {
	color: white;
	text-align: center;

}

h2 {
	font-size: 2em;

}

#pages h1 {
	font-weight: 900;
	font-size: 4em;
	color: white;
	font-family: 'Russo One', sans-serif;

	/*font-family: sans-serif;*/
	text-align: center;
	/*width: 700px;*/

	margin: auto;
}

#pages > .page {
	/*display: inline-block;*/
	
	display: block;
	height: 60vh;
	width: 60vw;
	margin-top: 10vh;
	margin-left: 20vw;
	margin-right: 20vw;
	/*border: 5px black solid;*/
	/*box-shadow: 0px 0px 20px black;*/
	/*background-color: grey;*/
}

</style>
