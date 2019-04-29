<template>
	<div class="">
		<div class="file-title-wrap">
			<el-row>
				<span class="news-title">文件列表</span>
			</el-row>
		</div>
		<ul class="file-list">
			<li v-for="file in files">
				<router-link :to="{name:'files',params:{id:file.id}}">{{file.fileName}}</router-link>
				<span>{{news.publishTime}}</span>
			</li>
		</ul>
	</div>
</template>

<script>
	const OK = 200
	export default {
		data() {
			return {
				files: [],
			}
		},
		methods: {
			getNewsList: function(typeId, pageNum, pageSize) {
				this.$axios.get("/api/files", {
						params: {
							passageTypeId: typeId,
							pageNum: pageNum,
							pageSize: pageSize
						}
					})
					.then(res => {
						if (res.data.code == OK) {
							this.files = res.data.data;
						} else {
							this.$layer.alert(res.data.data);
						}
					})
			}
		},
		created() {
			var typeId = this.$route.params.typeId;
			this.getNewsList(typeId, 1, 6);
		}
	}
</script>

<style scoped="scoped">
	.file-list li {
		height: 32px;
		line-height: 32px;
	}
	
	.file-list li>a {
		display: inline-block;
		width: 270px;
		height: 32px;
		line-height: 32px;
		margin:2px 25px;
		text-align: left;
		
		-webkit-line-clamp: 1;
		overflow: hidden;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		white-space: normal;
	}
	
</style>
