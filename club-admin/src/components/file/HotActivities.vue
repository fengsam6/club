<template>
	<div v-if="filePage != null">
	
		<el-button type="success" icon="el-icon-plus" @click="addPage()" size="mini">添加</el-button>
		<el-table :data="fileData" stripe style="width:100%" border>
			<el-table-column prop="id" label="num" width="100"></el-table-column>
			<el-table-column prop="fileName" label="图片名称" width="340"></el-table-column>
			<el-table-column prop="filePath" label="图片路径" width="340"></el-table-column>
			<el-table-column prop="activityId" label="图片关联活动id" width="340"></el-table-column>
			<el-table-column fixed="right" label="操作" width="300">
				<template slot-scope="scope">
					<el-button type="primary" icon="el-icon-edit" @click="editPage(scope.row)" size="mini">编辑</el-button>
					<el-button type="success" icon="el-icon-plus" @click="addPage()" size="mini">添加</el-button>
					<el-button type="danger" icon="el-icon-delete" @click="deleteFile(scope.row)" size="mini">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-pagination background layout="prev, pager, next" :current-page.sync="currentPage" :total="filePage.total"  @current-change="refreshFilePage" :page-size="filePage.pageSize"></el-pagination>
	</div>
</template>

<script>
const OK = 200;
export default {
	data() {
		return {
			filePage: {},
			fileData:[],
			fileName:null,
			fileTypeList:[],
			currentPage:1
		};
	},
	methods: {
		getFilePage: function(typeId, pageNum, pageSize) {
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
			var activityId = row.activityId;
			console.log(activityId);
			this.$router.push({ name: 'EditActivity', query: {id: activityId} });
		},
		addPage: function() {
			this.$router.push({ name: 'AddActivity' });
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
				this.getFilePage(6,this.currentPage, 8);
			});
		},
		find: function() {
			var fileTypeId = this.$route.query.fileTypeId;
			this.getFilePage(fileTypeId,this.currentPage, 8);
		},
		refreshFilePage: function() {
			var fileTypeId = this.$route.query.fileTypeId;
			this.getFilePage(fileTypeId,this.currentPage, 8);
		},
	},
	created() {
		var fileTypeId = this.$route.query.fileTypeId;
		this.getFilePage(fileTypeId,this.currentPage, 8);
		this.getFileTypeList();
	}
};
</script>

<style scoped="scoped"></style>
