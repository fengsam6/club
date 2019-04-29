<template>
	<el-form class="" :model="activity" label-width="100px">
		<el-form-item label="活动名称"><el-input v-model="activity.activityName"></el-input></el-form-item>
		<el-form-item label="活动举行时间"><el-date-picker type="date" placeholder="选择日期" v-model="activity.holdTime"></el-date-picker></el-form-item>
		<el-form-item label="活动地点"><el-input v-model="activity.site"></el-input></el-form-item>
		<quill-editor v-model="activity.introduce" :options="editorOption"></quill-editor>
		<el-form-item>
			<el-upload class="upload-demo" action="/api/files/upload" :on-change="handleChange" :file-list="fileList" :on-remove="beforeRemove">
				<!-- <i class="el-icon-upload"></i> -->
				<el-button size="small" type="primary">点击上传</el-button>
				<div slot="tip" class="el-upload__tip">选择要上传的文件，且不超过2M</div>
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
			file: { id: 0 }
		};
	},
	methods: {
		add: function() {
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
					this.$router.push({name:"ActivityList"})
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
				this.file = response.data;
				this.activity.fileId = this.file.id;
				this.file.id = 0;
				console.log(this.activity.fileId);
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
		handleExceed: function(files, fileList) {
			this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
		},
		beforeRemove: function(file, fileList) {
			return this.$confirm(`确定移除 ${file.name}？`);
		}
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
