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
		margin: 78px auto;
		min-height: 550px;
	}
	@media screen and (max-width: 600px){
	   .main{
		   width: 95%;
		   padding: 3px;

		    position: relative;
		   top: 0;
		   bottom: 0;
	   }

	}
	@media screen and (min-width: 1196px){
       .main{
		   width: 1024px;
	   }
    }
</style>
