<template>
	<div v-if="filePage != null">
		<el-form :inline="true">
			
		
		</el-form>
		<el-table :data="fileData" stripe style="width:100%" border>
			<el-table-column prop="id" label="num" width="100"></el-table-column>
			<el-table-column prop="fileName" label="文件名称" width="340"></el-table-column>
			<el-table-column prop="filePath" label="文件路径" width="340"></el-table-column>
			<el-table-column prop="fileTypeId" label="文件类型id"></el-table-column>
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
			currentPage:1
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
						this.filePage = res.data.data;
						this.fileData = this.filePage.list;
						this.pages = this.filePage.pages;
					} else {
						this.$message.error(res.data.data);
					}
				});
		},
		refreshFilePage:function(){
				var typeId = this.$route.params.typeId;
				this.getFileList(typeId,this.currentPage, 8);
		}
	},
	created() {
		var typeId = this.$route.params.typeId;
		this.getFileList(typeId,this.currentPage, 8);
	}
};
</script>

<style scoped="scoped"></style>
