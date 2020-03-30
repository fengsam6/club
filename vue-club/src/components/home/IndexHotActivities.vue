<template>
	<div>
		<el-col :span="6" v-for="activityImg in hotActivityImgs" :key="activityImg.id" :xs="24" :sm="12" :md="6">
			<router-link class="img-show" :to="{name:'Activity',params:{id:activityImg.activityId}}">
				<img :src="'/fileServer'+activityImg.filePath" alt="activityImg.fileName" class="show-picture" />
				</router-link>
			<!-- <a class="img-show" href="#"><img :src="'/fileServer'+img.filePath" alt="img.fileName" class="show-picture" /></a> -->
		</el-col>
	</div>
</template>

<script>
	const OK = 200;
	export default {
		data() {
			return {
				filePageVo:{},
				hotActivityImgs: [],
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
							this.hotActivityImgs = this.filePageVo.list;
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
			this.getFileList(6,this.currentPage, 4);
		}
	};
</script>

<style>
	.show-picture {
		width: 240px;
		height: 220px;
		padding: 5px;
		cursor: pointer;
	}
</style>
