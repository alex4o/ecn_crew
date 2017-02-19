
<!-- <template>


<div class="main" >
	<div class="bg" v-bind:style="{ background: bg }"></div>

		<router-view name="nav" v-on:content="show"></router-view>
		<router-view v-on:bg="chBg" class="content" v-bind:class="{ active: content }"></router-view>

		<radio/>

	</div>    
</template> -->

<template>

	<div id="root">

		<header class="">
			
				
			<router-link to="/" class="logo">
				ECNC
			</router-link>
				
			<nav class="sub">
				<span>Събития</span>
				<span>На запис</span>
				<!-- <span>Контакти</span> -->
				<span>За нас</span>
			</nav>
		</header>

		<div class="page">
			<nav class="side">
				<ul>
					<li>Галерии</li>
					<li>Лицата в ECNC</li>
					<li>Радио</li>
				</ul>
			</nav>
			<main>
				<router-view class="content"></router-view>
			</main>
		</div>
		
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
		},
		show() {
			this.content = true
		}
	},
	mounted: function () {
		// setTimeout(() => {
		// 	this.active = false
		// 	setTimeout(() => {
		// 		this.content = true
		// 	}, 1000)
		// }, 1000)
	}
}
</script>

<style lang="stylus">

@import "var.styl"

body 
	font-family: "Roboto"
	background darken(white, 7)
	

nav.side 
	background: grey
	position fixed
	top 0
	left 10 - menu-size
	
	width: menu-size
	height: 100vh
	transition all .4s
	z-index 10
	&:hover
		left 0
		
	
	// position: absolute
	// top: 100px
	// left: 0px
	ul
		list-style none
		padding: 0px
		margin: 0px
		
		li
			color white
			font-size: 1.3em
			padding-left: 20px
			line-height: 50px
			background: grey
			transition: all .3s
			
			&:hover
				background: #777
	

#app 
	width: 100%
	
#root
	width: 100%
			
.page 
	display flex
	

header
	background: #3f51b5
	
	@media (max-width: 800px)
		height: header-size - 20px
		.logo
			flex 1 1
			line-height: header-size - 20px !important
			
			width 170px !important
			border none  !important


	@media (max-width: 600px)
		flex-direction: column
	
		height: header-size
		.sub
			background: darken(#3f51b5, 5)
			

		.logo
			
			width auto
			line-height: header-size - 40px !important

			
	height: header-size
	width: 100vw
	display: flex !important
	flex-direction: row
	// transition height flex-direction .7s


	.sub
		// background: lighten(#3f51b5, 8)
		// transition all 1s
	
		line-height: sub-header-size
		padding-left: 20px
		box-sizing border-box
		color: white
		flex: 1
		align-items: flex-end;
		display: flex
		span
			line-height 40px
			box-sizing border-box
			padding: 0 10px 0px 10px

	.logo
		box-sizing border-box	
		transition all 1s
		
		// height: header-size

		line-height header-size
 
		
		display: block
		
		text-decoration none
		color white
		font-size 3em
		// padding-left: 25px
		// padding-right: 25px
		text-align center
		box-sizing border-box	
		
		width: menu-size
		border-right 2px white solid
			
main
	display: flex !important
	// flex-direction: row
	justify-content center
	flex 1
	// overflow-x: hidden
	// overflow-y: scroll
	// height: calc(100vh - 100px)
	// position 
	
	h2
		font-size: 2em

		margin-top 40px
		margin-bottom 0px
		margin-left 20px
		padding 0px
		// width calc(100vw - 380px)
					
					
	
		

</style>
