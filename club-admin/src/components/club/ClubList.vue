<template>
	<div v-if="clubPage != null">
		<el-form :inline="true">
			<el-form-item label="社团名称">
				<el-input placeholder="请输入社团名称" prefix-icon="el-icon-search" v-model="clubName" class="input-with-select" width="120px"></el-input>
			</el-form-item>
			<el-form-item label="社团类型">
				<el-select v-model="clubTypeId" placeholder="请选择社团类型">
					<el-option label="所有" value=""></el-option>
					<el-option v-for="clubType in clubTypeList" :key="clubType.id" :label="clubType.type" :value="clubType.id"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item><el-button type="primary" @click="find" icon="el-icon-search">查询</el-button></el-form-item>
		</el-form>
		<el-table :data="clubData" stripe style="width:100%" border>
			<el-table-column prop="num" label="num" width="180"></el-table-column>
			<el-table-column prop="name" label="社团名称" width="180"></el-table-column>
			<!-- <el-table-column prop="introduce" label="文社团简介" width="180"></el-table-column> -->
			<el-table-column prop="createTime" label="创建时间" width="180"></el-table-column>
			<el-table-column prop="clubType.type" label="团类型"></el-table-column>
			<el-table-column prop="status" label="社团状态" width="180"></el-table-column>
			<el-table-column fixed="right" label="操作" width="270">
				<template slot-scope="scope">
					<el-button type="primary" icon="el-icon-edit" @click="editPage(scope.row)" size="mini">编辑</el-button>
					<el-button type="success" icon="el-icon-plus" @click="addPage()" size="mini">添加</el-button>
					<el-button type="danger" icon="el-icon-delete" @click="deleteClub(scope.row)" size="mini">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-pagination
			background
			layout="prev, pager, next"
			:current-page.sync="currentPage"
			:total="clubPage.total"
			@current-change="refreshClubPage"
			:page-size="clubPage.pageSize"
		></el-pagination>
	</div>
</template>

<script>
const OK = 200;
export default {
	data() {
		return {
			clubPage: {},
			input: '',
			clubData: [],
			clubTypeList: [],
			clubName: null,
			clubTypeId: null,
			currentPage: 1
		};
	},
	components: {},
	methods: {
		getClubPage: function(pageNum, pageSize) {
			this.$axios
				.get('/api/clubs', {
					params: {
						clubTypeId: this.clubTypeId,
						name: this.clubName,
						pageNum: pageNum,
						pageSize: pageSize
					}
				})
				.then(res => {
					if (res.data.code == OK) {
						this.clubPage = res.data.data;
						this.clubData = this.clubPage.list;
						this.pages = this.clubPage.pages;
					} else {
						this.$message.error(res.data.data);
					}
				});
		},
		editPage: function(row) {
			var num = row.num;
			console.log(num);
			this.$router.push({ name: 'EditClub', query: { num: num } });
		},
		addPage: function() {
			this.$router.push({ name: 'AddClub' });
		},
		deleteDao: function(clubId) {
			this.$axios.delete('/api/clubs/' + clubId).then(res => {
				if (res.data.code == OK) {
					this.$message.success('删除成功');
				} else {
					this.$message.error(res.data.data);
				}
			});
		},
		deleteClub: function(row) {
			var num = row.num;
			this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				this.deleteDao(num);
				this.getClubPage(this.currentPage, 8);
			});
		},
		find: function() {
			this.getClubPage(this.currentPage, 8);
		},
		refreshClubPage: function() {
			this.getClubPage(this.currentPage, 8);
		},
		getClubTypeList: function() {
			this.$axios.get('/api/clubTypes').then(res => {
				if (res.data.code == OK) {
					this.clubTypeList = res.data.data;
				} else {
					this.$message.error(res.data.data);
				}
			});
		}
	},
	created() {
		this.getClubPage(this.currentPage, 8);
		this.getClubTypeList();
	},
	watch: {
		$route(to, from) {
			this.getClubPage(this.currentPage, 8);
		}
	}
};
</script>
<style scoped="scoped"></style>
