<template>
	<div >
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
	name: 'Main',
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


.main {
	min-height: 560px;
	padding: 15px;
	margin-bottom: 25px;
}

</style>
