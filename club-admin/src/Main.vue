<template>
	<div >

		<el-container width="100%">
			<el-aside width="200px" class="left-nav-container"><left-nav /></el-aside>
			<el-container  direction="vertical">
        <v-header />
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
  margin-top: 70px;
	min-height: 500px;
	min-width: 996px;
	padding: 4px 10px;
  overflow: hidden;
	margin-bottom: 25px;
}

</style>
