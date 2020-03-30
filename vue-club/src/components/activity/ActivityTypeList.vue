<template>
	<el-menu default-active="activeIndex" class="el-menu-vertical-demo" active-text-color="#9a0e14" 
	text-color="#000" >
		<el-menu-item  v-for="(activityType, index) in activityTypeList" :key="index">
			<span slot="title">
				<router-link :to="{name:'ActivityList',query:{typeId:activityType.id}}">{{ activityType.type }}</router-link>
			</span>
		</el-menu-item>
	</el-menu>
</template>

<script>
	const OK = 200;
	export default {
		data() {
			return {
				activityTypeList: [],
				activeIndex: '1'
			};
		},
		methods: {
			getActivityTypeList: function() {
				this.$axios.get('/api/activityTypes').then(res => {
					if (res.data.code == OK) {
						this.activityTypeList = res.data.data;
					} else {
						this.$layer.alert(res.data.data);
					}
				});
			}
		},
		created() {
			this.getActivityTypeList();
		}
	};
</script>

<style scoped="scoped">
	.router-link-exact-active.router-link-active{
		display: block;
		width: 100% !important;
		font-size: 120%;
		font-weight: 900;
		color: #9a0e14;
	}
	
</style>
