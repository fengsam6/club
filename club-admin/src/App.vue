<template>
	<div id="app">
		<router-view />
	</div>
</template>

<script>
import LeftNav from '@/components/common/LeftNav';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
export default {
	name: 'App',
	data() {
		return {
			
		};
	},
	components: {
		LeftNav,
		'v-header': Header,
		'v-footer': Footer
	}
};
</script>

<style>
#app {
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	color: #2c3e50;
}


</style>
