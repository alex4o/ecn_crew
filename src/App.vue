
<template>


<div class="main" >
		<div class="bg" v-bind:style="{ background: bg }"></div>

		<router-view name="nav" v-on:content="show"></router-view>
		<router-view v-on:bg="chBg" class="content" v-bind:class="{ active: content }"></router-view>

		<radio/>

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
@import url('https://fonts.googleapis.com/css?family=Russo+One');


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
		margin-top: 80px

		&.active 
			opacity: 1 !important


a {
	text-decoration: none;
}

.box
	display: flex;





</style>
