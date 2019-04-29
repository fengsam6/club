<template>
	<el-menu default-active="activeIndex" class="" active-text-color="#9a0e14" text-color="#000" background-color="#ddd">
		<el-menu-item v-for="(newsType, index) in newsTypeList" :key="index">
			<span slot="title">
				<router-link :to="{ name: 'PassageList', query: { passageTypeId: newsType.id } }">{{ newsType.type }}</router-link>
			</span>
		</el-menu-item>
	</el-menu>
</template>

<script>
const OK = 200;
export default {
	data() {
		return {
			newsTypeList: [],
			activeIndex: '1'
		};
	},
	methods: {
		getNewsTypeList: function() {
			this.$axios.get('/api/passageTypes').then(res => {
				if (res.data.code == OK) {
					this.newsTypeList = res.data.data;
				} else {
					this.$layer.alert(res.data.data);
				}
			});
		}
	},
	created() {
		this.getNewsTypeList();
	},
	watch: {
		$route(to, from) {
			this.getNewsTypeList();
		}
	}
};
</script>

<style scoped="scoped">
.news-list li {
	height: 32px;
	line-height: 32px;
}

.news-list li > a {
	display: inline-block;
	width: 270px;
	height: 32px;
	line-height: 32px;
	margin: 2px 25px;
	text-align: left;

	-webkit-line-clamp: 1;
	overflow: hidden;
	display: -webkit-box;
	-webkit-box-orient: vertical;
	white-space: normal;
}
.router-link-exact-active.router-link-active{
		font-size: 120%;
		font-weight: 900;
		color: #9a0e14;
	}
</style>
