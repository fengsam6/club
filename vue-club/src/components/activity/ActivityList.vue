<template>
	<el-container>
		<el-header>
			<div class="site-nav">
				当前位置:
				<router-link :to="{ name: 'Home' }">首页</router-link>
				>
				<span>社团风采</span>
				>
				<router-link :to="{ name: 'ActivityList', query: { typeId: activityPageVo.activityType.id } }" class="activity-title" v-if="activityPageVo.activityType != null">
					{{ activityPageVo.activityType.type }}
				</router-link>
			</div>
		</el-header>
		<el-container>
			<el-aside width="200px"><activity-type-list /></el-aside>
			<el-main v-if="activityPageVo != null">
				<div class="activity-title-wrap">
					<el-row>
						<span class="activity-title" v-if="activityPageVo.activityType != null">{{ activityPageVo.activityType.type }}</span>
					</el-row>
				</div>
				<v-hr />
				<ul class="activity-list" v-if="activityPageVo.activityPageInfo != null">
					<li v-for="activity in activityPageVo.activityPageInfo.list">
						<router-link :to="{ name: 'Activity', params: { id: activity.id } }">{{ activity.activityName }}</router-link>
						<span>{{ activity.publishTime }}</span>
					</li>
				</ul>
			</el-main>
		</el-container>
		<el-pagination
			v-if="activityPageVo.activityPageInfo != null"
			background
			layout="prev, pager, next"
			:current-page.sync="currentPage"
			:total="activityPageVo.activityPageInfo.total"
			@current-change="refreshActivityPage"
			:page-size="activityPageVo.activityPageInfo.pageSize"
		></el-pagination>
	</el-container>
</template>

<script>
const OK = 200;
import activityTypeList from '@/components/activity/ActivityTypeList';
import Hr from '@/components/common/Hr.vue';
export default {
	data() {
		return {
			activityPageVo: {},
			currentPage: 1
		};
	},
	components: { activityTypeList, 'v-hr': Hr },
	methods: {
		getActivityPage: function(pageNum, pageSize) {
			var typeId = this.$route.query.typeId;
			console.log(typeId);
			this.$axios
				.get('/api/activities', {
					params: {
						activityTypeId: typeId,
						pageNum: pageNum,
						pageSize: pageSize
					}
				})
				.then(res => {
					console.log(res.data.data);
					if (res.data.code == OK) {
						this.activityPageVo = res.data.data;
					} else {
						this.$layer.alert(res.data.data);
					}
				});
		},
		refreshActivityPage: function() {
			this.getActivityPage(this.currentPage, 8);
		}
	},
	created() {
		this.getActivityPage(this.currentPage, 8);
	},
	watch: {
		$route(to, from) {
			this.getActivityPage(this.currentPage, 8);
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
.activity-title-wrap .activity-title {
	display: block;
	width: 160px;
	font-size: 24px;
	color: #9a0e14;
	margin-bottom: 15px;
}
.activity-list li {
	height: 32px;
	line-height: 32px;
}
.activity-list li > a {
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
