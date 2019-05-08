<template>
	<el-form class="" :model="passage" label-width="100px">
		<el-form-item label="新闻标题"><el-input v-model="passage.title"></el-input></el-form-item>
		<quill-editor v-model="passage.content" :options="editorOption"></quill-editor>
		<el-form-item>
			<el-upload ref="upload" class="upload-demo" action="/api/files/upload" :auto-upload="false" :on-change="handleChange" :file-list="fileList" :on-remove="beforeRemove">
				<el-button slot="trigger" size="small" type="primary">选取文件</el-button>
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
		add:function () {
			 this.$refs.upload.submit();
		},
		addNews: function() {
			this.$axios.post('/api/passages/', this.passage).then(res => {
				if (res.data.code == OK) {
					this.$message.success('添加新闻成功');
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
			console.log(response);
			if (response != null && response.code == OK) {
				console.log(response.data);
				this.file = response.data;
				this.passage.fileId = this.file.id;
				this.file.id = 0;
				this.$message.success('添加文件成功');
				console.log(this.passage.fileId);
				this.addNews();
			}
			this.fileList = fileList.slice(-3);
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
