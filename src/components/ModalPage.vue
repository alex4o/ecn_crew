
<template>
	<modal :show="this.o" @close="close" class="modal" width="800" height="400">
		<div class="model_content">
			<iframe v-if="video != null" width="760" height="430" :src="video" frameborder="0"></iframe>
			<div v-else :src="this.url" class="image" :style="{ background: 'url(' + url + ')' }"></div>

			<h1>{{title}}</h1>
			<article v-html="content_html"></article>


		</div>
	</modal>
</template>

<script>

import Modal from '../components/ModalScroll'
import marked from "marked"


export default {
	name: 'modalPage',
	props: ['url', 'title', 'content', 'video'],
	components: {
		Modal
	},
	methods: {
		close(){
			this.o = false
		},
		open(){
			
			this.o = true
		}
	},
	data(){
		return {
			o: false
		}
	},
	computed: {
		content_html() {
			return marked(this.content)

		}
	},
	mounted: function () {

	}
}
</script>

<style lang="stylus" scoped>
	.modal
		color black
		overflow auto

	.model_content
		display flex
		flex-direction column
		.image
			height 430px
			background-position: center !important
			background-origin: border-box !important
			background-size: cover !important
			background-repeat: no-repeat


</style>
