<template>
	<el-container>
		<el-header>
			<div class="site-nav">
				当前位置:
				<router-link :to="{ name: 'Home' }">首页</router-link>
				>
				<router-link :to="{ name: 'ClubList', query: { typeId: clubPageVo.clubType.id } }" class="club-title" v-if="clubPageVo.clubType != null">社团检索</router-link>
			</div>
		</el-header>
		<el-container>
			<el-aside width="200px"><club-type-list /></el-aside>
			<el-main v-if="clubPageVo != null">
				<div class="news-title-wrap">
					<el-row>
						<span class="news-title" v-if="clubPageVo.clubType != null">{{ clubPageVo.clubType.type }}</span>
					</el-row>
				</div>
				<v-hr />
				<ul class="news-list" v-if="clubPageVo.clubPageInfo != null">
					<li v-for="club in clubPageVo.clubPageInfo.list">
						<router-link :to="{ name: 'Club', params: { num: club.num } }">{{ club.name }}</router-link>
						<span>{{ club.publishTime }}</span>
					</li>
				</ul>
			</el-main>
		</el-container>
		<el-pagination
      class=""
			v-if="clubPageVo.clubPageInfo != null"
			background
			layout="prev, pager, next"
			:current-page.sync="currentPage"
			:total="clubPageVo.clubPageInfo.total"
			@current-change="refreshClubPage"
			:page-size="clubPageVo.clubPageInfo.pageSize"
		></el-pagination>
	</el-container>
</template>

<script>
const OK = 200;
import clubTypeList from '@/components/club/ClubTypeList';
import Hr from '@/components/common/Hr.vue';
export default {
	data() {
		return {
			clubPageVo: {},
			currentPage:1
		};
	},
	components: { clubTypeList, 'v-hr': Hr },
	methods: {
		getClubPage: function(pageNum, pageSize) {
			var typeId = this.$route.query.typeId;
			console.log(typeId);
			this.$axios
				.get('/api/clubs', {
					params: {
						clubTypeId: typeId,
						pageNum: pageNum,
						pageSize: pageSize
					}
				})
				.then(res => {
					if (res.data.code == OK) {
						this.clubPageVo = res.data.data;
					} else {
						this.$layer.alert(res.data.data);
					}
				});
		},
		refreshClubPage:function(){
			this.getClubPage(this.currentPage, 8);
		}
	},
	created() {
		this.getClubPage(this.currentPage, 8);
	},
	watch: {
		$route(to, from) {
			this.getClubPage(this.currentPage, 8);
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
.news-title-wrap .news-title {
	display: block;
	width: 180px;
	font-size: 24px;
	color: #9a0e14;
	margin-bottom: 15px;
}
.news-list li {
	height: 32px;
	line-height: 32px;
}
.hr {
	border: 2px solid #9a0e14;
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
@media screen and (max-width: 600px) {
	.el-header, .el-aside {
		display: none;
	}
}
</style>
