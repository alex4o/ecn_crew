
<template>

		<nav>
			<div class="left">
				<a id="logo"  href="#/">ecnc</a>
			</div>
			<div class="right">
			<a href="#/events">Събития</a>
			<a href="#/music">Музика</a>
			<a href="#/sport">Спорт</a>
			<a href="#/shows">Комедия</a>
			<a href="#/art">Изкуство</a>
			</div>
		</nav>

</template>

<script>
import Velocity from "velocity-animate"


export default {
	name: 'StdNav',
	data: function() {
		return {
			active: false,
			content: false,
		}
	},
	components: {

	},
	methods: {

	},
	mounted: function () {
		this.$emit("content")
	}
}
</script>

<style lang="stylus" scoped>

nav * {
	color: white;
	text-decoration: none;

}

nav {
	display: flex !important;
	justify-content: space-between;
	background-color: rgba(0,0,0, 0.9);
	
	text-decoration: none;
	flex-direction: row;
	margin-bottom: 1em;
	align-items center
	height 60px
	position fixed
	top 0px
	left 0px
	right 0px
	z-index 100
	// filter: blur(2px)
	
	// &:before {
	// 	filter: blur(2px);
	// 	top 0px
	// 	left 0px
	// 	right 0px
	// 	position fixed
	// 	content: ""
	// 	display block
	// 	height 80px
		
	// }
}

nav > .left {
	flex: 1 ;
	display: block;	
	// align-items center
	// align-self baseline
	font-family: sans-serif;
	transition: all 1s;
	height 60px
	
	box-sizing: border-box

    > #logo {
	    line-height: 60px;
	    // margin: 10px;
	    font-size: 3em;
	    box-sizing: border-box;
	    padding-left: 3vw;
	    height: 60px;
	}
}

nav > .right {
	// padding: 20px;
	/*flex: 2;*/
	margin-left: auto;
	margin-right: auto;
	margin-right: 60px;
	display: flex
	align-items center
	
	/*height: 80px;*/
	/*line-height: 80px;*/
	text-align: center;
	/*font-size: 2em;*/
	text-decoration: none;

}


nav > .right > a {
	margin: 10px;
	padding 10px

	font-size: 1.5em;
	/*font-family: Helvetica;*/
	font-family: 'Russo One', sans-serif;
	// padding-bottom: 10px;
	border-bottom 0px white solid
	font-weight: 900;
	transition: border-bottom .09s;
	&:hover{
		border-bottom 3px white solid
	}
}

nav a {
	color: white;
}

a {
	text-decoration: none;
}

.box
	display: flex;





</style>
