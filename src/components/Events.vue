<template>

		<div id="pages">
			<div class="page">
				<h1>Events</h1>
				<div v-for="doc in docs">
					<h2>{{doc.doc.title}}</h2>
					{{doc.doc.content}} 
				</div>
			</div>
		</div>
</template>

<script>
let events = null

export default {
	name: 'home',
	data:() => {
		return {
			info: "",
			docs: []
		}
	},
	components: {
		
	},
	created: function() {
		events = this.$pouchDB.events()
	},
	mounted: function () {
		events.allDocs({
			include_docs: true
		}).then((result) => {
			console.log(result.rows)
			this.docs =  result.rows
			// handle result
		}).catch(function (err) {
			console.log(err);
		});

		events.changes({live: true}).on("change", () => {
			events.allDocs({
				include_docs: true
			}).then((result) => {
				console.log(result.rows)
				this.docs =  result.rows
				// handle result
			}).catch(function (err) {
				console.log(err);
			});
		})


	}
}
</script>

<style scoped>
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
