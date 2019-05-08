<template>
	<div class="header-wrap">
		<el-menu :default-active="activeIndex" class="header" background-color="#9a0e14" mode="horizontal" text-color="#fff"
		 active-text-color="#ffd04b">
			<el-menu-item index="1">
				<router-link :to="{name:'Home'}">首页</router-link>
			</el-menu-item>
			<el-submenu index="2" >
				<template slot="title">社团概况</template>
				<el-menu-item index="2-1" >
					<router-link :to="{name:'Passage',params:{id:1}}">社团联简介</router-link>
				</el-menu-item>
				<el-menu-item index="2-2">
					<router-link :to="{name:'Passage',params:{id:2}}">社团简介</router-link>
				</el-menu-item>
				<el-menu-item index="2-3">
					<router-link :to="{name:'Passage',params:{id:3}}">机构设置</router-link>
				</el-menu-item>
			</el-submenu>
			<el-submenu index="3">
				<template slot="title">社团快讯</template>
				<el-menu-item index="3-1">
					<router-link :to="{name:'PassageList',query:{passageTypeId:1}}">重要通知</router-link>
				</el-menu-item>
				<el-menu-item index="3-2">
					<router-link :to="{name:'PassageList',query:{passageTypeId:2}}">社团要闻</router-link>
				</el-menu-item>
				<el-menu-item index="3-3">
					<router-link :to="{name:'PassageList',query:{passageTypeId:1}}">重要通知</router-link>
				</el-menu-item>
			</el-submenu>
			<el-submenu index="4">
				<template slot="title">社团风采</template>
				<el-menu-item index="4-1">
					<router-link :to="{name:'ActivityList',query:{typeId:1}}">活动预告</router-link>
				</el-menu-item>
				<el-menu-item index="4-2">
					<router-link :to="{name:'ActivityList',query:{typeId:2}}">精彩活动回顾</router-link>
				</el-menu-item>
				<el-menu-item index="4-3">
					<router-link :to="{name:'ActivityList',query:{typeId:3}}">社团风采</router-link>
				</el-menu-item>
			</el-submenu>
			<el-menu-item index="5">
				<router-link :to="{name:'ClubList',query:{typeId:1}}">社团检索</router-link>
			</el-menu-item>
			<el-menu-item index="6">
				<router-link :to="{name:'FileList',query:{fileTypeId:3}}">资料下载</router-link>
			</el-menu-item>
			<!-- <el-menu-item index="7">
				<router-link :to="{name:'ClubList',query:{num:1}}">社团申请</router-link>
			</el-menu-item> -->
			<el-menu-item index="7" class="rightMenu">
				<a :href="adminAccessUrl" target="_blank">登录</a>
			</el-menu-item>
		</el-menu>
		
	</div>

	</div>
</template>

<script>
	export default {

		data() {
			return {
				activeIndex: '1',
				adminAccessUrl:"http://localhost:8080/"
			}
		},
		created: function() {},
		mounted: function() {

		}
	}
</script>

<style scoped="scoped">
	.header-wrap {
		background-color: #9a0e14;
	}

	.header {
		width: 1196px;
		height: 80px;
		line-height: 80px;
		margin: 0 auto;
	}

	.el-menu.el-menu--horizontal a{
		color: #fff;
	}
	.rightMenu{
		float: right;
		height: 80px;
		line-height: 80px;
		background-color: #000000;
	}
	a {
		text-decoration: none;
		color: #eee;
		font-size: 16px;
	}
</style>
