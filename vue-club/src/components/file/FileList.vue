<template>
	<el-container>
		<el-header>
			<div class="site-nav">
				当前位置:
				<router-link :to="{ name: 'Home' }">首页</router-link>
				>
				<span class="large_type">资料下载</span>
			</div>
		</el-header>
	
		<el-container>
				<ul class="file-list">
					<li v-for="file in files" :key="file.id">
						<a :href="'/fileServer/'+file.filePath">{{ file.fileName }}</a>
						<!-- <router-link :to="{name:'files',params:{id:file.id}}">{{file.fileName}}</router-link> -->
						<span>{{ file.createTime }}</span>
					</li>
				</ul>
			</el-main>
		</el-container>
		<el-pagination
			v-if="filePageVo != null"
			background
			layout="prev, pager, next"
			:current-page.sync="currentPage"
			:total="filePageVo.total"
			@current-change="refreshPasagePage"
			:page-size="filePageVo.pageSize"
		></el-pagination>
	</el-container>
	
</template>

<script>
const OK = 200;
export default {
	data() {
		return {
			filePageVo:{},
			files: [],
			currentPage:1,
			fileDownPath: ""
		};
	},
	methods: {
		getFileList: function(typeId, pageNum, pageSize) {
			this.$axios
				.get('/api/files', {
					params: {
						fileTypeId: typeId,
						pageNum: pageNum,
						pageSize: pageSize
					}
				})
				.then(res => {
					if (res.data.code == OK) {
						// console.log(res.data.data.list);
						this.filePageVo = res.data.data;
						console.log(this.filePageVo);
						this.files = this.filePageVo.list;
					} else {
						this.$layer.alert(res.data.data);
					}
				});
		},
		refreshPasagePage: function() {
			this.getFileList(3,this.currentPage, 8);
		}
	},
	created() {
		var typeId = this.$route.query.typeId;
		this.getFileList(3,this.currentPage, 8);
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
.file-title {
	display: block;
	width: 120px;
	margin: 0 auto;
	font-size: 24px;
	color: #9a0e14;
	margin-bottom: 15px;
}
.file-list li {
	height: 32px;
	line-height: 32px;
}

.file-list li > a {
	display: inline-block;
	width: 270px;
	height: 32px;
	line-height: 32px;
	float: left;
	margin-left: 150px;
	text-align: left;

	-webkit-line-clamp: 1;
	overflow: hidden;
	display: -webkit-box;
	-webkit-box-orient: vertical;
	white-space: normal;
}
.file-list li > span {
	height: 32px;
	line-height: 32px;
	color: #111;
	font-size: 16px;
}
</style>
