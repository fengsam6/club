<template>
	<div v-if="activityPage != null">
		<el-form :inline="true" size="small">
			<el-form-item label="活动名称">
        <el-input placeholder="请输入活动名称"   v-model="activityName" class="input-with-select inputStyle" width="120px"></el-input>
      </el-form-item>
			<el-form-item label="活动地点">
        <el-input placeholder="请输入活动名称"  v-model="activitySite" class="input-with-select inputStyle" width="120px">
        </el-input></el-form-item>
			<el-form-item label="活动类型" prop="activityTypeId">
				<el-select v-model="activityTypeId" placeholder="请选择活动类型">
					<el-option label="所有" value=""></el-option>
					<el-option v-for="activityType in activityTypeList" :key="activityType.id" :label="activityType.type" :value="activityType.id"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item><el-button type="primary" @click="find" icon="el-icon-search">查询</el-button></el-form-item>
			<el-button type="success" icon="el-icon-plus" @click="addPage()"  size="small">添加</el-button>
		</el-form>
		<el-table :data="activityData" stripe style="width:100%" border size="mini">
			<el-table-column prop="id" label="id" width="80"></el-table-column>
			<el-table-column prop="activityName" label="活动名称" width="220" :sortable="true"></el-table-column>
			<el-table-column prop="site" label="活动地点" width="180" :sortable="true"></el-table-column>
			<el-table-column prop="applyTime" label="活动申请时间" width="140" :sortable="true"></el-table-column>
			<el-table-column prop="holdTime" label="活动举行时间" :sortable="true"></el-table-column>
			<el-table-column prop="activityType.type" label="活动类型" width="120" :sortable="true"></el-table-column>
			<el-table-column fixed="right" label="操作" width="270">
				<template slot-scope="scope">
					<el-button type="primary" icon="el-icon-edit" @click="editPage(scope.row)" size="mini">编辑</el-button>
					<el-button type="success" icon="el-icon-plus" @click="addPage" size="mini">添加</el-button>
					<el-button type="danger" icon="el-icon-delete" @click="deleteActivity(scope.row)" size="mini">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
    <el-pagination
      class="page"
      background
      layout="total, sizes, prev, pager, next"
			:current-page.sync="currentPage"
			:total="activityPage.total"
			@current-change="refreshactivityPage"
      @size-change="handleSizeChange"
			:page-size="GLOBAL.pageSize"
      :page-sizes="GLOBAL.pageSizeArray"
		></el-pagination>
	</div>
</template>

<script>
const OK = 200;
export default {
	data() {
		return {
			activityPage: {},
			activityData: [],
			activityTypeList: [],
			currentPage: 1,
			activitySearch: {},
			activityName: null,
			activityTypeId: null,
			activitySite: null
		};
	},
	components: {  },
	methods: {
		getActivityPage: function(pageNum, pageSize) {
			this.$axios
				.get('/api/activities', {
					params: {
						pageNum: pageNum,
						pageSize: pageSize,
						activityName: this.activityName,
						activityTypeId: this.activityTypeId,
						site: this.activitySite
					}
				})
				.then(res => {
					if (res.data.code == OK) {
						this.activityPage = res.data.data;
						this.activityData = this.activityPage.list;
						console.log(this.activityData);
					} else {
						this.$message.error(res.data.data);
					}
				});
		},
		editPage: function(row) {
			var id = row.id;
			console.log(row.id);
			this.$router.push({ name: 'EditActivity', query: { id: id } });
		},
		addPage: function() {
			this.$router.push({ name: 'AddActivity' });
		},
		deleteActivityDao: function(id) {
			this.$axios.delete('/api/activities/' + id).then(res => {
				if (res.data.code == OK) {
					this.$message.success('删除成功');
				} else {
					this.$message.error(res.data.data);
				}
			});
		},
		deleteActivity: function(row) {
        const id = row.id;
        this.$confirm('此操作将永久删除该活动, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			})
				.then(() => {
					this.deleteActivityDao(id);
					this.getActivityPage(this.currentPage, 8);
				})
				.catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
		},
		refreshactivityPage: function(page) {
        this.currentPage=page
			this.getActivityPage(this.currentPage, this.pageSize);
		},
      handleSizeChange:function(size){
          this.pageSize =size
          this.getActivityPage(this.currentPage, this.pageSize);
      },
		find: function() {
			this.getActivityPage(this.currentPage, 8);
		},
		getActivityTypeList: function() {
			this.$axios.get('/api/activityTypes').then(res => {
				if (res.data.code == OK) {
					this.activityTypeList = res.data.data;
				} else {
					this.$message.error(res.data.data);
				}
			});
		}
	},
	created() {
		this.getActivityPage(this.currentPage, 8);
		this.getActivityTypeList();
	},
	watch: {
		$route(to, from) {
			this.getActivityPage(this.currentPage, 8);
		}
	}
};
</script>
<style scoped="scoped">
  @import "../../css/common.css";
</style>
