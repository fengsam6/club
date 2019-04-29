<template>
	<el-form class="" :model="passage" label-width="100px">
		<el-form-item label="文章标题"><el-input v-model="passage.title"></el-input></el-form-item>
		<el-form-item label="文章发布时间"><el-date-picker type="date" placeholder="选择日期" name="publishTime" v-model="passage.publishTime"></el-date-picker></el-form-item>
		<quill-editor v-model="passage.content" :options="editorOption"></quill-editor>
		<el-form-item>
			<el-upload class="upload-demo" action="/api/files/upload" :on-change="handleChange" :file-list="fileList" :on-remove="beforeRemove">
				<!-- <i class="el-icon-upload"></i> -->
				<el-button size="small" type="primary">点击上传</el-button>
				<div slot="tip" class="el-upload__tip">选择要上传的文件，且不超过2M</div>
			</el-upload>
		</el-form-item>
		<!-- <input type="hidden" v-model="passage.fileId"> -->
		<el-form-item label="新闻类型" prop="passageTypeId">
			<el-select v-model="passage.passageTypeId" placeholder="请选择新闻类型">
				<el-option v-for="newsType in newsTypeList" :key="newsType.id" :label="newsType.type" :value="newsType.id"></el-option>
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
			passage: {},
			newsTypeList: [],
			editorOption: {
				placeholder: '输入新闻内容：',
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
			this.$axios.post('/api/passages/', this.passage).then(res => {
				if (res.data.code == OK) {
					this.$message.success('添加文章成功');
					this.$router.push({ name: 'PassageList' });
				} else {
					this.$message({
						message: res.data.message,
						type: 'error'
					});
				}
			});
		},
		getNewsTypeList: function() {
			this.$axios.get('/api/passageTypes').then(res => {
				if (res.data.code == OK) {
					this.newsTypeList = res.data.data;
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
				this.passage.fileId = this.file.id;
				this.file.id = 0;
				console.log(this.passage.fileId);
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
		this.getNewsTypeList();
	},
	watch: {
		$route(to, from) {
			this.getNewsTypeList();
		}
	}
};
</script>

<style scoped="scoped"></style>
