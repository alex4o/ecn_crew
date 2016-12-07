
<template>

		<nav>
			<div class="left">
				<!-- <transition v-on:enter="enter" v-on:before-enter="beforeEnter" appear> -->
						<a id="logo" v-bind:class="{ active: !active }" href="#/">ecnc</a>
				<!-- </transition> -->
			</div>
			<div class="right">
			<a href="#/events">Събития</a>
			<a href="#/music">Музика</a>
			<a href="#/sport">Спорт</a>
			<a href="#/shows">Предавания</a>
			<a href="#/art">Изкуство</a>
			</div>
		</nav>

</template>

<script>

let data = {
	active: true
}

export default {
	name: 'HomeNav',
	data: () => data,
	components: {

	},
	methods: {

	},
	mounted: function () {
		console.log(this.active)
		if(this.active == true){
			setTimeout(() => {
				this.active = false
			}, 1000)	
		}
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
	/*background-color: #80bfff;*/
	text-decoration: none;
	flex-direction: row;
	margin-bottom: 1em;
	height 80px
	align-items center
	
}

nav > .left {
	padding: 20px;
	flex: 1 ;
	display: block;
	align-items center

}

nav > .right {
	// padding: 20px;
	/*flex: 2;*/
	margin-left: auto;
	margin-right: auto;
	margin-right: 80px;
	display: flex
	aligin-items baseline
	/*height: 80px;*/
	/*line-height: 80px;*/
	text-align: center;
	/*font-size: 2em;*/
	text-decoration: none;
	align-items center

}

nav > .left > #logo {
	font-size: 3em;
}

nav > .right > a {
	margin: 20px;
	font-size: 2em;
	/*font-family: Helvetica;*/
	font-family: 'Russo One', sans-serif;
	// padding-bottom: 10px;
	// border-bottom: 0.1em white solid;
	font-weight: 900;
	transition: padding-bottom .3s;
	&:hover{
		// padding-bottom: 20px;
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


</style>
