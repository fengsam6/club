<template>
	<div id="app">
		<v-header />
		<router-view class="main" />
		<v-footer />
	</div>
</template>
<script>
	import Vue from 'vue'

	import Header from "@/components/common/Header"
	import Footer from "@/components/common/Footer"
	import Home from "@/components/home/Home"


	export default {
		name: 'App',
		components: {
			"v-header": Header,
			"v-footer": Footer
		}

	}
</script>

<style scoped="scoped">
	.main {
		/* background-color: #E9EEF3; */
		color: #333;
		text-align: center;
		width: 1024px;
		min-height: 600px;
		margin: 0 auto;
	}
</style>
