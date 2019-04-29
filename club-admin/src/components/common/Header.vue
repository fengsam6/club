<template>
	<div class="header">
		<div class="sys-name"><router-link :to="{ name: 'Home' }">社团管理系统后台</router-link></div >
	</div>
</template>

<script>
export default {
	data() {
		return {};
	},
	created: function() {},
	mounted: function() {}
};
</script>

<style scoped="scoped">
.header {
	/* width: 1196px; */
	height: 80px;
	margin: 0 auto;
	background-color: #2f4056;
}
.header .sys-name {
	height: 80px;
	line-height: 80px;
	margin: 0 20px;
	color: white;
}
.header .sys-name a{
	color: #fff;
	text-decoration: none;
	font: 16px;
}
</style>
