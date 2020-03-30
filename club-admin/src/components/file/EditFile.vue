<template>
	<el-form class="" :model="file" label-width="80px">
		<el-form-item label="文件名称"><el-input v-model="file.fileName" disabled></el-input></el-form-item>
		<el-form-item label="下载文件"><a :href="'/fileServer/'+file.filePath">下载</a></el-input></el-form-item>
		<el-form-item label="文件类型" >
			<el-select  v-model="file.fileTypeId" placeholder="请选择文件类型">
				<el-option v-for="fileType in fileTypeList"  :key="fileType.id" :label="fileType.type" :value="fileType.id"></el-option>
			</el-select>
			
		</el-form-item>
		<el-form-item >
			<el-button type="primary" @click="update">更新</el-button>
			<el-button @click="goBack">返回</el-button>
		</el-form-item>
	</el-form>
</template>

<script>
const OK = 200;
export default {
	data() {
		return {
			file: {},
			fileTypeList: [],
		};
	},
	components: {
	},
	methods: {
		get: function(id) {
			this.$axios.get('/api/files/' + id).then(res => {
				console.log(res.data);
				if (res.data.code == OK) {
					this.file = res.data.data;
				} else {
					this.$layer.msg(res.data.message, { icon: 5 });
				}
			});
		},
		
		update: function() {
			this.$axios
				.put('/api/files/', 
					 this.file
				)
				.then(res => {
					console.log(this.file);
					// this.$layer.msg(res.data);
					console.log(res.data);
					if (res.data.code == OK) {
						this.$message.success(	'更新文章成功');
						this.$router.push({name:"FileList"})
					} else {
						this.$message.error(res.data.message);
					}
				}).catch(function (error) {
                    this.$message.error(error);
                  });;
		},
		getFileTypeList: function() {
			this.$axios.get('/api/fileTypes').then(res => {
				if (res.data.code == OK) {
					this.newsTypeList = res.data.data;
				} else {
					this.$message.error(res.data.data);
				}
			});
		},
	
		goBack:function(){
			this.$router.back(-1)
		}
	},
	created() {
		var id = this.$route.query.id;
		this.get(id);
		// this.getFileTypeList();
		
	},
	watch: {
		$route(to, from) {
			var id = this.$route.params.id;
			this.get(id);
		}
	}
};
</script>

<style scoped="scoped">

</style>
