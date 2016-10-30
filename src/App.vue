
<template>

<div class="main">
			<nav>
				<div class="left">
				<div class="logo">
					<transition name="slide-fade" appear>

							<a id="logo" class="active" href="#/">ecnc</a>
					</transition>

				</div>
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

			<router-view></router-view>

		<!--  <div id="pages">
				<div class="page page-1">

					
				</div>
			</div> -->

		</div>    
</template>

<script>
export default {
	name: 'home',

	components: {
		
	}
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Russo+One');
@import url('http://yui.yahooapis.com/3.5.0/build/cssreset/cssreset-min.css');


.slide-fade-enter-active {
  /*transition: all .3s ease;*/
	transition: all 1s;

}
.slide-fade-leave-active {
  /*transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);*/
}
.slide-fade-enter, .slide-fade-leave-active {
	/*left: 50%;*/
	/*top: 50%;*/
	transform: scale(3) translate(50% , 505);
}

nav * {
	color: white;
	text-decoration: none;

}

nav {
	padding: 10px;
	display: flex !important;
	justify-content: space-between;
	/*background-color: #80bfff;*/
	text-decoration: none;
	clear: both;
	flex-direction: row;
	margin-bottom: 1em;
}

.logo {

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

nav > .left > .logo > a {
	font-size: 3em;
}

#logo{
	position: relative;
	left: 40px;
	top: 30px;
	font-family: sans-serif;
}

#logo.active {

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
