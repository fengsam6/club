<template>
	<div id="app">
		<v-header />
		<el-container width="100%">
			<el-aside width="200px" class="left-nav-container"><left-nav /></el-aside>
			<el-container  direction="vertical">
				<router-view class="main" />
				<v-footer />
			</el-container>
		</el-container>
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
			topNoticesVo: {},
			topNewsListVo: {}
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

.main {
	height: 560px;
	padding: 10px;
	/* background-color: #99a9bf; */
}

</style>
