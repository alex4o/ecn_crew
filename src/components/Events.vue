<template>

		<div id="pages">
			<div class="page">
				<h1>Events</h1>
				<input type="text" class="search" placeholder="Search">
				<div v-for="event in events">
					<h2>{{event.title}}</h2>
					{{event.content}} 
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
			info: "",
			events: []
		}
	},
	components: {
		
	},
	created: function() {
		events = this.$pouchDB.events()

		events.allDocs({
			include_docs: true
		}).then((result) => {
			// console.log(result.rows)
			this.events =  result.rows.map(doc => doc.doc)
			// handle result
		}).catch(function (err) {
			console.log(err);
		});
// feign sleep - when you pretend
	},
	mounted: function () {
		// console.log("mounted")
		changes = events.changes({live: true}).on("change", () => {
			events.allDocs({
				include_docs: true
			}).then((result) => {
				// console.log("update",result.rows)
				this.events =  result.rows.map(doc => doc.doc)

				// handle result
			}).catch(function (err) {
				console.log(err);
			});
		})
	},
	beforeDestroy: () => {
		// console.log("bDest:", this)
		changes.cancel()
	}
}
</script>

<style scoped lang="stylus">
.search
	background-color rgba(0,0,0,0)
	border: none
	width 50vw
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
