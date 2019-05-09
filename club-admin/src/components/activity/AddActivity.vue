<template>
	<el-form class="" :model="activity" label-width="100px">
		<el-form-item label="活动名称"><el-input v-model="activity.activityName"></el-input></el-form-item>
		<el-form-item label="活动举行时间">
			<el-date-picker format="yyyy 年 MM 月 dd 日" value-format="yyyy 年 MM 月 dd 日" type="date" placeholder="选择日期" v-model="activity.holdTime"></el-date-picker>
		</el-form-item>
		<el-form-item label="活动地点"><el-input v-model="activity.site"></el-input></el-form-item>
		<quill-editor v-model="activity.introduce" :options="editorOption"></quill-editor>
		<el-form-item>
			<el-upload ref="upload" class="upload-demo" :action="'/api/files/uploadImg?relativePath='+relativePath" :on-change="handleChange" :file-list="fileList" :on-remove="beforeRemove" :auto-upload="false">
				<el-button slot="trigger" size="small" type="primary">选取图片</el-button>
				<div slot="tip" class="el-upload__tip">选择要上传的图片，且不超过1M</div>
			</el-upload>
		</el-form-item>
		<el-form-item label="活动类型" prop="activityTypeId">
			<el-select v-model="activity.activityTypeId" placeholder="请选择活动类型">
				<el-option v-for="activityType in activityTypeList" :key="activityType.id" :label="activityType.type" :value="activityType.id"></el-option>
			</el-select>
		</el-form-item>
		<el-form-item>
			<el-button type="primary" @click="add">添加</el-button>
			<el-button>取消</el-button>
		</el-form-item>
	</el-form>
</template>

<script>
const OK = 200;
export default {
	data() {
		return {
			activity: {},
			activityTypeList: [],
			editorOption: {
				placeholder: '输入活动简介：',
				// 编辑器的配置
				// something config
				theme: 'snow'
			},
			imageUrl: '',
			fileList: [],
			file: {activityId:0},
			relativePath:"/images/activity/"
		};
	},
	methods: {
		add: function() {
			this.addActivitie();
		},
		addActivitie: function() {
			console.log(this.activity);
			this.$axios.post('/api/activities/', this.activity).then(res => {
				console.log(this.activity);
				// this.$layer.msg(res.data);
				console.log(res.data);
				if (res.data.code == OK) {
					this.$message({
						message: '添加文章成功',
						type: 'success'
					});
					console.log(res.data.data);
					this.file.activityId = res.data.data;
					this.$refs.upload.submit();
				} else {
					this.$message({
						message: res.data.message,
						type: 'error'
					});
				}
			});
		},
		getActivityTypeList: function() {
			this.$axios.get('/api/activityTypes').then(res => {
				if (res.data.code == OK) {
					this.activityTypeList = res.data.data;
				} else {
					this.$message.error(res.data.data);
				}
			});
		},
		handleChange: function(file, fileList) {
			var response = file.response;
			if (response != null && response.code == OK) {
				console.log(response.data);
				this.file.filePath = response.data;
				this.file.fileName =this.getFileName(this.file.filePath);
				console.log(this.file.fileName);
				console.log(this.activity.fileId);
				this.$message.success('上传文件成功');
				this.saveFile();
				
			}
			this.fileList = fileList.slice(-3);
		},
		handleSuccess: function(response, file, fileList) {
			//图片上传成功
			console.log(res);
			console.log(file);
			// this.imageUrl = URL.createObjectURL(file.raw);
		},
		handlePreview: function(file) {
			console.log(file);
		},
		saveFile: function() {
			this.$axios.post('/api/files/activity', this.file).then(res => {
				if (res.data.code == OK) {
					this.$message.success('添加活动成功');
					this.$router.push({ name: 'ActivityList' });
				} else {
					this.$message({
						message: res.data.message,
						type: 'error'
					});
				}
			});
		},
		handleExceed: function(files, fileList) {
			this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
		},
		beforeRemove: function(file, fileList) {
			return this.$confirm(`确定移除 ${file.name}？`);
		},
		getFileName: function(filePath) {
			var fileName = null;
			if(filePath!=null){
				if(filePath.indexOf("/") != -1){
					fileName = filePath.substring(filePath.lastIndexOf("/")+1);
				}
			}
			return fileName;
		},
	},
	created() {
		this.getActivityTypeList();
	},
	watch: {
		$route(to, from) {
			this.getActivityTypeList();
		}
	}
};
</script>

<style scoped="scoped">
.title {
	display: block;
	font-size: 24px;
	color: #9a0e14;
	margin-top: 10px;
}
.content {
	line-height: 150%;
	padding: 10px 20px;
	text-indent: 35px;
	text-align: left;
}
</style>
