<template>
	<div>
		main
	</div>
</template>

<script>
const OK = 200;

export default {
	data() {
		return {
			topNoticesVo: {},
			topNewsListVo: {}
		};
	},
	components: {
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
		}
	},
	created() {
// 		this.getTopNotices(1, 8);
// 		this.getTopNewsList(2, 8);
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
	margin-left: 240px;
	color: #000;
	font-size: 16px;
	height: 32px;
	line-height: 32px;
}
</style>
