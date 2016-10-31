
<template>

<div class="main">
			<nav>
				<div class="left">
					<!-- <transition v-on:enter="enter" v-on:before-enter="beforeEnter" appear> -->
							<a id="logo" v-bind:class="{ active: !active }" href="#/">ecnc</a>
					<!-- </transition> -->
				</div>
				<div class="right">
				<a href="#/music">Music</a>
				<a href="#/sports">Sports</a>
				<a href="#/shows">Shows</a>
				<a href="#/art">Art</a>
				<a href="#/events">Events</a>
				</div>
			</nav>
			<span class="clear"></span>

			<router-view class="content" v-bind:class="{ active: content }"></router-view>

			<audio src="http://ecncrew.tk:8000/source" controls="controls" id="radio"></audio>
		<!--  <div id="pages">
				<div class="page page-1">

					
				</div>
			</div> -->

		</div>    
</template>

<script>
import Velocity from "velocity-animate"

export default {
	name: 'app',
	data: function() {
		return {
			active: true,
			content: false
		}
	},
	components: {
		
	},
	mounted: function () {
		setTimeout(() => {
			this.active = false
			setTimeout(() => {
				this.content = true
			}, 1000)
		}, 1000)
	}
}
</script>

<style lang="stylus">
@import url('https://fonts.googleapis.com/css?family=Russo+One');
@import url('http://yui.yahooapis.com/3.5.0/build/cssreset/cssreset-min.css');

.content {
	transition: all .7s;
	opacity: 0;

	&.active {
		opacity: 1;

	}
}

#radio
	position: fixed
	bottom: 20px
	right: 20px
	// background-color: black

nav * {
	color: white;
	text-decoration: none;

}

nav {
	display: flex !important;
	justify-content: space-between;
	/*background-color: #80bfff;*/
	text-decoration: none;
	clear: both;
	flex-direction: row;
	margin-bottom: 1em;
}

nav > .left {
	padding: 20px;
	flex: 1 ;
	display: block;

}

nav > .right {
	padding: 20px;
	/*flex: 2;*/
	margin-left: auto;
	margin-right: auto;
	margin-right: 80px;

	/*height: 80px;*/
	/*line-height: 80px;*/
	text-align: center;
	/*font-size: 2em;*/
	text-decoration: none;

}

nav > .left > #logo {
	font-size: 3em;
}

#logo{

	left: 50%;
	top: 50%;

	transform: translateX(-50%) translateY(-50%) scale(3) ;

	position: absolute;

	font-family: sans-serif;
	transition: all 1s;
}

#logo.active {
	transform: scale(1);
	left: 20px;
	top: 20px;



}

nav > .right > a {
	margin: 20px;
	font-size: 4vh;
	/*font-family: Helvetica;*/
	font-family: 'Russo One', sans-serif;
	padding-bottom: 10px;
	border-bottom: 0.1em white solid;
	font-weight: 900;
	transition: padding-bottom .3s;

}



nav > .right > a:hover{
	padding-bottom: 20px;

}

nav a {
	color: white;
}

a {
	text-decoration: none;
}

.box {
	display: flex;
}

.main {
	flex: 5;
	background-image: url(../static/background.jpg);
	/*background: black;*/
		background-position: center; 
		background-origin: border-box;
		background-size:cover;
	height: 100vh;
}



</style>
