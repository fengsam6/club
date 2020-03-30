<template>
	<el-menu default-active="activeIndex" class="el-menu-vertical-demo" active-text-color="#9a0e14" text-color="#000">
		<el-menu-item  v-for="(type, index) in typeList" :key="index">
			<span slot="title">
				<router-link :to="{name:'ActivityList',query:{typeId:type.id}}">{{ type.type }}</router-link>
			</span>
		</el-menu-item>
	</el-menu>
</template>

<script>
export default {
	data() {
		return{
			typeList: [],
			path:{}
		}
	},
	components:{
		props:["typeList","path"],
	}
};
</script>

<style scoped="scoped">
width: 150px;
</style>
