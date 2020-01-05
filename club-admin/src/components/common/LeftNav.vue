<template>
	<el-menu default-active="1" background-color="#2f4056" text-color="#fff" active-text-color="#5FB878" class="leftNav" :unique-opened="true">
		<el-submenu index="1">
			<template slot="title">
				文章管理
			</template>
			<el-menu-item index="1-1"><router-link :to="{ name: 'PassageList' }">文章列表</router-link></el-menu-item>
			<el-menu-item index="1-2"><router-link :to="{ name: 'AddPassage' }">添加文章</router-link></el-menu-item>
			<el-menu-item index="1-3"><router-link :to="{ name: 'PassageTypeList' }">文章类型列表</router-link></el-menu-item>
		</el-submenu>
		<el-submenu index="2">
			<template slot="title">
				活动管理
			</template>
			<el-menu-item index="2-1"><router-link :to="{ name: 'ActivityList' }">活动列表</router-link></el-menu-item>
			<el-menu-item index="2-2"><router-link :to="{ name: 'AddActivity' }">添加活动</router-link></el-menu-item>
			<el-menu-item index="2-3"><router-link :to="{ name: 'ActivityTypeList' }">活动类型列表</router-link></el-menu-item>
		</el-submenu>
		<el-submenu index="3">
			<template slot="title">
				社团管理
			</template>
			<el-menu-item index="3-1"><router-link :to="{ name: 'ClubList' }">社团列表</router-link></el-menu-item>
			<el-menu-item index="3-2"><router-link :to="{ name: 'AddClub' }">添加社团</router-link></el-menu-item>
			<el-menu-item index="1-3"><router-link :to="{ name: 'ClubTypeList' }">社团类型列表</router-link></el-menu-item>
		</el-submenu>
		<el-submenu index="4">
			<template slot="title">
				用户管理
			</template>
			<el-menu-item index="4-1"><router-link :to="{ name: 'UserList' }">用户列表</router-link></el-menu-item>
			<el-menu-item index="4-2"><router-link :to="{ name: 'AddUser' }">添加用户</router-link></el-menu-item>
			<el-menu-item index="4-3"><router-link :to="{ name: 'UserRoleList' }">用户角色列表</router-link></el-menu-item>
		</el-submenu>
		<el-submenu index="5">
			<template slot="title">
				资源管理
			</template>
			<el-menu-item index="5-1"><router-link :to="{ name: 'FileList', query: { fileTypeId: 3 } }">文件下载</router-link></el-menu-item>
			<el-menu-item index="5-1"><router-link :to="{ name: 'CarouselList', query: { fileTypeId: 4 } }">首页轮播图</router-link></el-menu-item>
			<el-menu-item index="5-1"><router-link :to="{ name: 'HotActivities', query: { fileTypeId: 6 } }">热门活动</router-link></el-menu-item>
		</el-submenu>
		<el-submenu index="5">
			<template slot="title">
				系统管理
			</template>
			<el-menu-item index="6-1"><a href="http://localhost:80" target="_blank">返回系统前台</a></el-menu-item>
		</el-submenu>
	</el-menu>
</template>

<script>
	const OK = 200
export default {
	data() {
		return {
			activeIndex: '1',
			accessFrontUrl: 'http://localhost:8011/'
		};
	},
	methods: {
		getFronUrl: function() {
			this.$axios.get('/api/system/frontUrl').then(res => {
				if (res.data.code == OK) {
					this.accessFrontUrl = res.data.data;
				}
			});
		}
	},
	created: function() {
		this.getFronUrl();
	}
};
</script>

<style scoped="scoped">
.leftNav {
  position: fixed;
	left: 0;
	top: 0;
  bottom: 0;
  width: 200px;
  background-color:#2f4056 !important;
}
.leftNav .el-menu-item a {
	color: #eee;
	text-decoration: none;
}
.router-link-exact-active.router-link-active {
	font-size: 120%;
	color: #409eff !important;
}
</style>
