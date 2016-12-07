<template>

 			<div id="pages">
				<div class="page">
				<h1>Welcome to ecnc</h1>

				</div>
			</div>
</template>

<script>
export default {
	name: 'home',

	components: {
		
	},
	mounted: function() {
		
	}
}
</script>

<style scoped lang="stylus">
#pages
	color: white;
	text-align: center;

#pages h1 {
	font-weight: 900;
	font-size: 5em;
	color: white;
	font-family: 'Russo One', sans-serif;

	/*font-family: sans-serif;*/
	text-align: center;
	/*width: 700px;*/
	line-height: 54vh;
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
