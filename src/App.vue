
<template>


<div class="main" >
		<div class="bg" v-bind:style="{ background: bg }">
		</div>
		<nav>
			<div class="left">
				<!-- <transition v-on:enter="enter" v-on:before-enter="beforeEnter" appear> -->
						<a id="logo" v-bind:class="{ active: !active }" href="#/">ecnc</a>
				<!-- </transition> -->
			</div>
			<div class="right">
			<a href="#/events">Събития</a>
			<a href="#/music">Музика</a>
			<a href="#/sports">Спорт</a>
			<a href="#/shows">Предавания</a>
			<a href="#/art">Изкуство</a>
			</div>
		</nav>
		<span class="clear"></span>

		<router-view v-on:bg="chBg" class="content" v-bind:class="{ active: content }"></router-view>

		<radio/>
	<!--  <div id="pages">
			<div class="page page-1">

				
			</div>
		</div> -->

	</div>    
</template>

<script>
import Velocity from "velocity-animate"
import Radio from "./components/Radio.vue"

export default {
	name: 'app',
	data: function() {
		return {
			active: true,
			content: false,
			bg: "url(../static/background.jpg)"
		}
	},
	components: {
		radio: Radio
	},
	methods: {
		chBg: function(background) {
			if(background == null){
				this.bg = "url(../static/background.jpg)"				

			}else{
				this.bg = background				
			}
		}
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

.bg
	position fixed
	top 0px
	bottom 0px
	left 0px
	right 0px
	z-index -1
	background-position: center !important
	background-origin: border-box !important
	background-size: cover !important
	background-repeat: no-repeat
	height: 100vh
	transition: all 1s
	

.main 
	transition: all 1s
	
	> .content
		transition: all .7s
		opacity: 0

		&.active 
			opacity: 1 !important



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
 	&.active {
		transform: scale(1);
		left: 3vw;
		top: 10px;
	}
}

nav > .right > a {
	margin: 20px;
	font-size: 2em;
	/*font-family: Helvetica;*/
	font-family: 'Russo One', sans-serif;
	padding-bottom: 10px;
	border-bottom: 0.1em white solid;
	font-weight: 900;
	transition: padding-bottom .3s;
	&:hover{
		padding-bottom: 20px;
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
