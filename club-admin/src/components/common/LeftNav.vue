<template>
	<el-menu default-active="1" background-color="#393d49" text-color="#fff" active-text-color="#5FB878" class="leftNav" unique-opened="true">
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
			<el-menu-item index="1-3"><router-link :to="{ name: 'ClubTypeList' }">文章类型列表</router-link></el-menu-item>
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
				文件管理
			</template>
			<el-menu-item index="5-1"><router-link :to="{ name: 'FileList' }">文件列表</router-link></el-menu-item>
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
export default {
	data() {
		return {};
	}
};
</script>

<style scoped="scoped">
.leftNav {
	margin: 0;
	padding: 0;
	height: 100%;
	min-height: 680px;
	background-color: #393d49;
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
