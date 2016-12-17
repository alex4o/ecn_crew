
<template>
<transition name="modal">

	<div class="modal-mask" @click="close" v-show="show">
		<div class="modal-container" @click.stop :style="{ width: Math.round(width) + 'px', height: Math.round(height) + 'px' }">
			<slot></slot>
		</div>
	</div>
</transition>
</template>

<script>

export default {
	name: 'modal',
	props: ['show', 'height', 'width'],
	components: {

	},
	methods: {
		close() {
			this.$emit('close')
			console.log("close")
		}
	},
	computed: {

	},
	mounted: function () {

	}
}
</script>

<style lang="stylus" scoped>

.modal-mask
	position: fixed;
	z-index: 9998;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, .5);
	transition: opacity .3s ease;
	display: flex
	justify-content: center
	align-items center


.modal-container
	// width: 600px;

	padding: 20px 20px;
	background-color: #fff;
	border-radius: 2px;
	box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
	transition: all .5s ease;
	font-family: Helvetica, Arial, sans-serif
	box-sizeing border-box

.modal-enter, .modal-leave 
	opacity: 0
	


.modal-enter .modal-container,  .modal-leave .modal-container 
	transform: scale(1.1)


</style>
