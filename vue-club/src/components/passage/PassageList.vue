<template>
	<el-container>
		<el-header>
			<div class="site-nav">
				当前位置:
				<router-link :to="{ name: 'Home' }">首页</router-link>
				>
				<span class="large_type">社团快讯</span>
				>
				<router-link :to="{ name: 'PassageList', query: { typeId: newsPageVo.passageType.id } }" class="news-title" v-if="newsPageVo.passageType != null">
					{{ newsPageVo.passageType.type }}
				</router-link>
			</div>
		</el-header>

		<el-container>
			<el-aside width="200px"><pasage-type-list /></el-aside>
			<el-main v-if="newsPageVo != null">
				<div class="news-title-wrap">
					<el-row>
						<span class="news-title" v-if="newsPageVo.passageType != null">{{ newsPageVo.passageType.type }}</span>
					</el-row>
				</div>
				<v-hr />
				<ul class="news-list" v-if="newsPageVo.passagePageInfo != null">
					<li v-for="news in newsPageVo.passagePageInfo.list">
						<!-- <div> -->
						<router-link :to="{ name: 'Passage', params: { id: news.id } }" :key="news.id">{{ news.title }}</router-link>
						<span class="time">{{ news.publishTime }}</span>
						<!-- </div> -->
					</li>
				</ul>
			</el-main>
		</el-container>
		<el-pagination
			v-if="newsPageVo.passagePageInfo != null"
			background
			layout="prev, pager, next"
			:current-page.sync="currentPage"
			:total="newsPageVo.passagePageInfo.total"
			@current-change="refreshPasagePage"
			:page-size="newsPageVo.passagePageInfo.pageSize"
		></el-pagination>
	</el-container>
</template>

<script>
const OK = 200;
import pasageTypeList from '@/components/passage/PassageTypeList.vue';
import Hr from '@/components/common/Hr.vue';
export default {
	data() {
		return {
			newsPageVo: {},
			typeId: '',
			currentPage: 1
		};
	},
	components: { pasageTypeList, 'v-hr': Hr },
	methods: {
		getNewsPage: function(pageNum, pageSize) {
			var typeId = this.$route.query.passageTypeId;
			this.typeId = typeId;
			console.log(typeId);
			this.$axios
				.get('/api/passages', {
					params: {
						passageTypeId: typeId,
						pageNum: pageNum,
						pageSize: pageSize
					}
				})
				.then(res => {
					if (res.data.code == OK) {
						this.newsPageVo = res.data.data;
					} else {
						this.$layer.alert(res.data.data);
					}
				});
		},
		refreshPasagePage: function() {
			this.getNewsPage(this.currentPage, 8);
		}
	},
	created() {
		this.getNewsPage(1, 8);
	},
	watch: {
		$route(to, from) {
			this.getNewsPage(this.currentPage, 8);
		}
	}
};
</script>

<style scoped="scoped">
.site-nav {
	float: left;
	height: 70px;
	line-height: 70px;
	font-size: 20px;
}
.large_type {
	margin: 0 5px;
}
.news-title-wrap .news-title {
	display: block;
	width: 120px;
	font-size: 24px;
	color: #9a0e14;
	margin-bottom: 15px;
}
.news-list li {
	height: 32px;
	line-height: 32px;
}

.news-list li > a {
	display: inline-block;
	float: left;
	margin-left: 20px;
	width: 170px;
	height: 32px;
	line-height: 32px;
	text-align: left;
	
	-webkit-line-clamp: 1;
	overflow: hidden;
	display: -webkit-box;
	-webkit-box-orient: vertical;
	white-space: normal;
}
.news-list li > .time {
	float: left;
	margin-left: 75px;
}

@media screen and (max-width: 600px) {
	.el-header, .el-aside {
		display: none;
	}
	.news-list li > a {
		float: left;
		width: 100px;
	}
	.news-list li > .time {
		float: left;
		margin-left: 30px;
	}
}
</style>
