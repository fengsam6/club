<template>
	<el-form class="" :model="file" label-width="80px">
		<!-- <el-form-item label="文件名称"><el-input v-model="file.fileName"></el-input></el-form-item> -->
		<el-form-item>
			<el-upload class="upload-demo" ref="upload" :name="file.fileName" action="/api/files/upload" :on-change="handleChange" :file-list="fileList"  :auto-upload="false">
				<!-- <i class="el-icon-upload"></i> -->
				 <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
				<div slot="tip" class="el-upload__tip">选择要上传的文件，且不超过2M</div>
			</el-upload>
		</el-form-item>
		<el-form-item >
			<el-button type="primary" @click="add">添加</el-button>
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
			fileList:[],
			fileTypeId:3
		};
	},
	components: {
	},
	methods: {
		add: function() {
			 this.$refs.upload.submit();
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
		},
		handleChange: function(file, fileList) {
			var response = file.response;
			console.log(response);
			if (response != null && response.code == OK) {
				console.log(response.data);
				this.$message.success("上传文件成功");
				this.$router.push({name:"FileList",query:{fileTypeId:this.fileTypeId}})
			}
			this.fileList = fileList.slice(-3);
		},
	},
	created() {
		var id = this.$route.query.id;
		
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
