<template>
<div>
	<waterfall :line="line" :line-gap="300" :min-line-gap="250" :max-line-gap="350" :watch="items" align="left" class="waterfall">
		<!-- each component is wrapped by a waterfall slot -->
		<waterfall-slot
			v-for="(item, index) in items"
			:width="item.width"
			:height="item.height"
			:order="index"
			:key="item._id"
		>
		<div class="item" :style="{ background: 'url(' + item.thumbURL + ')' }" v-on:click="show(item)">
	<!-- 		<img v-if="!item._attachments" src="../../static/default-placeholder-1024x1024.png">
			<img v-else v-bind:src="url + ':5984/art/' + item._id + '/' + Object.keys(item._attachments)[0] "> -->
			<!-- {{item.text}} -->
			<!--  {{item.author || "анонимен"}} -->
	
		</waterfall-slot>
	</waterfall>

	<modal style="overflow: auto" :show="showBigPicture" @close="closeBigPicture" :height="this.open.height" :width="this.open.width">
		<!-- <div id="img" :style="{ background: 'url(' + this.open.url + ')' }" /> -->
	
			<!-- <dic v-bind:src="this.open.url" :style="{ height: this.open.height+ 'px', width: this.open.width + 'px'}"></dic> -->
			<div class="image" :style="{ background: 'url(' + this.open.url + ')', height: this.open.height + 'px' }"></div>

			<!-- <div class="text"> -->
				<div class="title" v-if="this.open.title != null">Заглавие: {{this.open.title || "Няма"}}</div>
				<div class="title">Автор: {{this.open.author || "Анонимен"}}</div>
				<!-- <div class="content">{{item.content || "Няма съдържание"}}</div> -->
				<article v-html="this.open.content_html"></article>
				
			<!-- </div> -->
		
	</modal>
</div>
<!-- 	<div class="gallery" ref="gallery">
		<div v-for="item in items" class="item" :style="{ background: 'url(' + url + ':5984/art/' + item._id + '/' + Object.keys(item._attachments)[0] + ')'}">
		<div v-for="item in items" class="item" :style="{width: (item.width / item.height) * 300 + 'px', height: 300 + 'px'}">
			<div ></div>
			<img v-if="!item._attachments" src="../../static/default-placeholder-1024x1024.png">
			<img v-else v-bind:src="url + ':5984/art/' + item._id + '/' + Object.keys(item._attachments)[0] ">
		</div>
	</div>			
 -->
</template>

<script>

import Waterfall from 'vue-waterfall/lib/waterfall'
import WaterfallSlot from 'vue-waterfall/lib/waterfall-slot'

import Modal from '../components/ModalScroll'
import axios from 'axios'
import marked from "marked"


let art = null
let changes = null

let masonry = null

export default {
	name: 'art',
	url: '',
	data: () => {
		return {
			line: 'h',
			showBigPicture: false,
			open: {
				url: "",
				width: "",
				height: 0
			},
			items: [
			
			]
		}
	},
	components: {
		Waterfall,
		WaterfallSlot,
		Modal
	},
	mounted: function() {
		// console.log(this)
		// console.log(this.$emit)
		//this.$emit('bg', "red")
	},
	methods: {
		async show(item){
			item.url = item.fullURL
			this.showBigPicture = true
			let c1 = 1
			let c2 = 1
			// let c3 = item.height/item.width
			if(item.height > window.innerHeight) {
				 c1 = window.innerHeight/item.height
				 c1 -= 0.1
			}

			if(item.width > 860){
				 c2 = 860/item.width
				 c2 -= 0.1
			}

			let coef = Math.min(c1,c2)
			this.open = {...item}
			// this.open.width = (item.width)*coef
			// this.open.height = (item.height)*coef + 20
			let h = 760*(item.height/item.width) 
			// if( h > window.innerHeight * 0.8 ){
			// 	h = 900
			// }
			this.open.height = h

			let content = await axios.get(item.text)
			if(this.content != "" || this.content != null){
				
				this.open.content_long = marked(content.data)

			}
			this.open.content_long = ""
		
			

		},
		closeBigPicture() {
			this.showBigPicture = false
		},
		get() {
			art.query("js/pictures", {include_docs: true})
			.then((result) => {
				this.items =  result.rows.map(doc => {
					let res = doc.doc
					let images = Object.keys(res._attachments)
					res.thumbURL =  this.url + ':5984/art/' + res._id + '/' + images[0]
					if(images.leength > 1){
						res.fullURL =  this.url + ':5984/art/' + res._id + '/' + images[1]
					}else{
						res.fullURL =  res.thumbURL
					}
					
					res.text = this.url + ':5984/art/' + res._id + '/article.md'

					return res
				})
			}).catch(function (err) {
				console.log(err);
			});
		}
	},
	created: function() {
		art = this.$pouchDB.art()
		this.url = 'http://' + this.$pouchDB.url

		this.get()
		changes = art.changes({live: true, since: "now"}).on("change", () => {
			console.log("change")		
			this.get()
		})
	},
	mounted() {
		// masonry = new Masonry(this.$refs.gallery, {
		// 	layoutMode: 'masonry',
		// 	itemSelector: '.item',
		// 	// columnWidth: 300,
		// 	gutter: 16,

		// })

	
		// console.log(art)
		// this.$emit('bg', "black")
		


	},
	beforeDestroy: () => {
		// console.log("bDest:", this)
		// this.$emit('bg', "url(../static/background.jpg)")
		changes.cancel()
	}
}
</script>

<style scoped lang="stylus">

.waterfall 
	overflow visible !important

.item
	box-sizing border-box
	// background white

	// sfloat: left
	// height: 300px
	position absolute
	cursor pointer
	top 5px
	left 5px
	right 5px
	bottom 5px
	background-position: center !important
	background-origin: border-box !important
	background-size: cover !important
	background-repeat: no-repeat
	img
		height 300px 
		box-sizing border-box
		


.item:after {
  content: attr(index);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
}

.image
	width: 760px
	height: 100%
	background-position: center !important
	background-origin: border-box !important
	background-size: contain !important
	background-repeat: no-repeat !important

> .text 
	cursor pointer
	
	font-family sans-serif
	color white
	padding 10px
	box-sizing border-box
	background rgba(0,0,0, 0.8)
	height 12%

	
	> .title 
		font-size 1em

#pages
	display: block
	// background: 
	height: 60vh
	width: 70vw
	margin-top: 10vh
	margin-left: 15vw
	margin-right: 15vw

</style>
