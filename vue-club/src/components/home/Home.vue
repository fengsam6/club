<template>
	<div>
		<Slider />
		<el-row :gutter="100">
			<el-col :span="12">
				<div class="" v-if="topNoticesVo != null">
					<div class="news-title-wrap" v-if="topNoticesVo.passageType != null">
						<span class="news-title">{{ topNoticesVo.passageType.type }}</span>
						<router-link :to="{ name: 'PassageList', query: { passageTypeId: 1 } }" class="more" tag="span">更多>></router-link>
					</div>
					<ul class="news-list">
						<li v-for="notice in topNoticesVo.passageList">
							<div>
								<router-link :to="{ name: 'Passage', params: { id: notice.id } }" tag="a">{{ notice.title }}</router-link>
								<span class="time">{{ notice.publishTime }}</span>
							</div>
						</li>
					</ul>
				</div>
			</el-col>
			<el-col :span="12">
				<div class="grid-content bg-purple" v-if="topNoticesVo != null">
					<div class="news-title-wrap">
						<el-row v-if="topNewsListVo.passageType != null">
							<span class="news-title" v-if="topNewsListVo.passageType != null">{{ topNewsListVo.passageType.type }}</span>
							<router-link :to="{ name: 'PassageList', query: { passageTypeId: 2 } }" class="more" tag="span">更多>></router-link>
						</el-row>
					</div>
					<ul class="news-list">
						<li v-for="news in topNewsListVo.passageList">
							<el-row>
								<router-link :to="{ name: 'Passage', params: { id: news.id } }">{{ news.title }}</router-link>
								<span>{{ news.publishTime }}</span>
							</el-row>
						</li>
					</ul>
				</div>
			</el-col>
		</el-row>
		<!-- <el-row :gutter="100">
			<el-col :span="12">
				<div class="" v-if="topNoticesVo != null">
					<div class="news-title-wrap" v-if="topNoticesVo.passageType != null">
						<span class="news-title">近期活动预告</span>
						<router-link :to="{ name: 'PassageList', params: { typeId: 1 } }" class="more" tag="span">更多>></router-link>
					</div>
					<ul class="news-list">
						<li v-for="notice in topNoticesVo.passageList">
							<div>
								<router-link :to="{ name: 'Passage', params: { id: notice.id } }" tag="a">{{ notice.title }}</router-link>
								<span class="time">{{ notice.publishTime }}</span>
							</div>
						</li>
					</ul>
				</div>
			</el-col>
			<el-col :span="12">
				<div class="grid-content bg-purple" v-if="topNoticesVo != null">
					<div class="news-title-wrap">
						<el-row v-if="topNewsListVo.passageType != null">
							<span class="news-title" v-if="topNewsListVo.passageType != null">优秀社团</span>
							<router-link :to="{ name: 'PassageList', params: { typeId: 2 } }" class="more" tag="span">更多>></router-link>
						</el-row>
					</div>
					<ul class="news-list">
						<li v-for="news in topNewsListVo.passageList">
							<el-row>
								<router-link :to="{ name: 'Passage', params: { id: news.id } }">{{ news.title }}</router-link>
								<span>{{ news.publishTime }}</span>
							</el-row>
						</li>
					</ul>
				</div>
			</el-col>
		</el-row> -->
		<div class="news-title-wrap show-wrap"><div class="news-title show">视展青春</div></div>
		<el-row :gutter="10">
			<el-col :span="6" v-for="activity in activityList" :key="activity.id">
				<a class="img-show"><img :src="'/fileServer'" alt="activity.activityName" class="show-picture" /></a>
			</el-col>
			<el-col :span="6">
				<div class="img-show"><img src="/fileServer/show-img/p2.jpg" alt="" class="show-picture" /></div>
			</el-col>
			<el-col :span="6">
				<div class="img-show"><img src="/fileServer/show-img/p3.jpg" alt="" class="show-picture" /></div>
			</el-col>
			<el-col :span="6">
				<div class="img-show"><img src="/fileServer/show-img/p4.jpg" alt="" class="show-picture" /></div>
			</el-col>
		</el-row>
	</div>
</template>

<script>
const OK = 200;
import Slider from '@/components/common/Slider';
export default {
	data() {
		return {
			topNoticesVo: {},
			topNewsListVo: {},
			topActivityVo: {},
			activityList:[]
		};
	},
	components: {
		Slider
	},
	methods: {
		getTopNotices: function(typeId, n) {
			this.$axios
				.get('/api/passages/top/' + n, {
					params: {
						passageTypeId: typeId
					}
				})
				.then(res => {
					if (res.data.code == OK) {
						this.topNoticesVo = res.data.data;
					} else {
						this.$layer.alert('error');
					}
				});
		},
		getTopNewsList: function(typeId, n) {
			this.$axios
				.get('/api/passages/top/' + n, {
					params: {
						passageTypeId: typeId
					}
				})
				.then(res => {
					if (res.data.code == OK) {
						this.topNewsListVo = res.data.data;
					} else {
						this.$layer.alert('error');
					}
				});
		},
		getTopActivityList: function(typeId, n) {
			this.$axios
				.get('/api/activities' , {
					params: {
						activityTypeId: typeId,
						pageNum: 1,
						pageSize: n
					}
				})
				.then(res => {
					if (res.data.code == OK) {
						this.topActivityVo = res.data.data;
						this.activityList = this.topActivityVo.activityList;
						console.log(this.topActivityVo)
					} else {
						this.$layer.alert('error');
					}
				});
		}
	},
	created() {
		this.getTopNotices(1, 8);
		this.getTopNewsList(2, 8);
		this.getTopActivityList(2,4)
	}
};
</script>

<style scoped="scoped">
.news-title-wrap {
	background-color: #9a0e14;
	border-radius: 20px;
}

.news-title-wrap .news-title {
	display: inline-block;
	color: white;
	font-family: '微软雅黑';
	font-weight: 900;
	font-size: 18px;
	height: 40px;
	line-height: 40px;
}

.news-title-wrap .more {
	margin-left: 340px;
	color: #fff;
	font-size: 16px;
	cursor: pointer;
}

.news-title-wrap.show-wrap {
	margin-top: 18px;
}

.news-title-wrap .show {
	margin-left: -860px;
}

.news-list li {
	height: 32px;
	line-height: 32px;
}

.news-list li a {
	display: inline-block;
	float: left;
	width: 270px;
	height: 32px;
	line-height: 32px;
	margin: 0 25px;
	text-align: left;

	-webkit-line-clamp: 1;
	overflow: hidden;
	display: -webkit-box;
	-webkit-box-orient: vertical;
	white-space: normal;
}

.news-list li span {
	display: inline-block;
	margin-left: 30px;
	color: #000;
	font-size: 16px;
	height: 32px;
	line-height: 32px;
}
.show-picture {
	width: 280px;
	height: 280px;
	padding: 8px;
	cursor: pointer;
}
</style>
