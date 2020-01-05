<template>
	<div v-if="filePage != null">
		<el-form :inline="true" size="small">
			<el-form-item label="文件名称">
				<el-input placeholder="请输入文件名称" prefix-icon="el-icon-search" v-model="fileName" class="input-with-select" width="120px"></el-input>
			</el-form-item>
			<el-form-item label="文件类型">
				<el-select v-model="fileTypeId" placeholder="请选择文件类型">
					<el-option label="所有" value=""></el-option>
					<el-option v-for="fileType in fileTypeList" :key="fileType.id" :label="fileType.type" :value="fileType.id"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item><el-button type="primary" @click="find" icon="el-icon-search">查询</el-button></el-form-item>
			<el-button type="success" icon="el-icon-plus" @click="addPage()" size="small">添加</el-button>
		</el-form>
		<el-table :data="fileData" stripe style="width:100%" border size="mini">
			<el-table-column prop="id" label="num" width="100"></el-table-column>
			<el-table-column prop="fileName" label="文件名称" width="180"></el-table-column>
			<el-table-column prop="filePath" label="文件路径" ></el-table-column>
			<el-table-column prop="fileTypeId" label="文件类型id" width="80"></el-table-column>
			<el-table-column prop="passageId" label="图片关联文章id"  ></el-table-column>
			<el-table-column prop="activityId" label="图片关联活动id"  ></el-table-column>
			<el-table-column fixed="right" label="操作" width="280">
				<template slot-scope="scope">
					<el-button type="primary" icon="el-icon-edit" @click="editPage(scope.row)" size="mini">编辑</el-button>
					<el-button type="success" icon="el-icon-plus" @click="addPage()" size="mini">添加</el-button>
					<el-button type="danger" icon="el-icon-delete" @click="deleteFile(scope.row)" size="mini">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-pagination
			background
			layout="prev, pager, next"
			:current-page.sync="currentPage"
			:total="filePage.total"
			@current-change="refreshFilePage"
			:page-size="filePage.pageSize"
		></el-pagination>
	</div>
</template>

<script>
const OK = 200;
export default {
	data() {
		return {
			filePage: {},
			fileData: [],
			fileTypeId: 3,
			fileName: null,
			fileTypeList: [],
			currentPage: 1
		};
	},
	methods: {
		getFilePage: function(pageNum, pageSize) {
			this.$axios
				.get('/api/files', {
					params: {
						fileTypeId: this.fileTypeId,
						fileName:this.fileName,
						pageNum: pageNum,
						pageSize: pageSize
					}
				})
				.then(res => {
					if (res.data.code == OK) {
						this.filePage = res.data.data;
						this.fileData = this.filePage.list;
						this.pages = this.filePage.pages;
					} else {
						this.$message.error(res.data.data);
					}
				});
		},
		getFileTypeList: function() {
			this.$axios.get('/api/fileTypes').then(res => {
				if (res.data.code == OK) {
					this.fileTypeList = res.data.data;
				} else {
					this.$message.error(res.data.data);
				}
			});
		},
		editPage: function(row) {
			var id = row.id;
			console.log(id);
			this.$router.push({ name: 'EditFile', query: { id: id } });
		},
		addPage: function() {
			this.$router.push({ name: 'AddFile' });
		},
		deleteDao: function(fileId) {
			this.$axios.delete('/api/files/' + fileId).then(res => {
				if (res.data.code == OK) {
					this.$message.success('删除成功');
				} else {
					this.$message.error(res.data.data);
				}
			});
		},
		deleteFile: function(row) {
			var fileId = row.id;
			this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				this.deleteDao(fileId);
				this.getFilePage(this.currentPage, 8);
			});
		},
		find: function() {
			this.getFilePage(this.currentPage, 8);
		},
		refreshFilePage: function() {
			var fileTypeId = this.$route.query.fileTypeId;
			this.getFilePage(fileTypeId, this.currentPage, 8);
		}
	},
	created() {
		var fileTypeId = this.fileTypeId;
		this.getFilePage(this.currentPage, 8);
		this.getFileTypeList();
	}
};
</script>

<style scoped="scoped"></style>
