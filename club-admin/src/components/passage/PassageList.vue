<template>
	<div v-if="passagePage != null">
		<el-form :inline="true">
			<el-form-item label="文章标题">
				<el-input placeholder="请输入文章标题" prefix-icon="el-icon-search" v-model="title" class="input-with-select" width="120px"></el-input>
			</el-form-item>
			<el-form-item label="新闻类型">
				<el-select v-model="pasageTypeId" placeholder="请选择新闻类型">
					<el-option  label="所有" value=""></el-option>
					<el-option v-for="newsType in newsTypeList" :key="newsType.id" :label="newsType.type" :value="newsType.id"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item><el-button type="primary" @click="find" icon="el-icon-search">查询</el-button></el-form-item>
		</el-form>
		<el-table :data="passageData" stripe style="width:100%" border>
			<el-table-column prop="id" label="id" width="180"></el-table-column>
			<el-table-column prop="title" label="标题" width="180"></el-table-column>
			<el-table-column prop="passageTypeId" label="文章类型id" width="180"></el-table-column>
			<el-table-column prop="publisher" label="发布者" width="180"></el-table-column>
			<el-table-column prop="publishTime" label="发布时间"></el-table-column>
			<el-table-column prop="clickNum" label="点击次数" width="180"></el-table-column>
			<el-table-column fixed="right" label="操作" width="270">
				<template slot-scope="scope">
					<el-button type="primary" icon="el-icon-edit" @click="editPage(scope.row)" size="mini">编辑</el-button>
					<el-button type="success" icon="el-icon-plus" @click="addPage()" size="mini">添加</el-button>
					<el-button type="danger" icon="el-icon-delete" @click="deletePassage(scope.row)" size="mini">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-pagination
			background
			layout="prev, pager, next"
			:current-page.sync="currentPage"
			:total="passagePage.total"
			@current-change="refreshPassagePage"
			:page-size="passagePage.pageSize"
		></el-pagination>
	</div>
</template>

<script>
const OK = 200;
import pasageTypeList from '@/components/passage/PassageTypeList.vue';
export default {
	data() {
		return {
			passagePage: {},
			title: null,
			pasageTypeId: null,
			passageData: [],
			search: {},
			newsTypeList: [],
			currentPage: 1
		};
	},
	components: { pasageTypeList },
	methods: {
		getPassagePage: function(pageNum, pageSize) {
			this.$axios
				.get('/api/passages', {
					params: {
						passageTypeId: this.pasageTypeId,
						title: this.title,
						pageNum: pageNum,
						pageSize: pageSize
					}
				})
				.then(res => {
					if (res.data.code == OK) {
						this.passagePage = res.data.data;
						this.passageData = this.passagePage.list;
						this.pages = this.passagePage.pages;
					} else {
						this.$message.error(res.data.data);
					}
				});
		},
		editPage: function(row) {
			var id = row.id;
			console.log(row.id);
			this.$router.push({ name: 'EditPassage', params: { id: id } });
		},
		addPage: function() {
			this.$router.push({ name: 'AddPassage' });
		},
		deleteDao: function(passageId) {
			this.$axios.delete('/api/passages/' + passageId).then(res => {
				if (res.data.code == OK) {
					this.$message.success('删除成功');
				} else {
					this.$message.error(res.data.data);
				}
			});
		},
		deletePassage: function(row) {
			var id = row.id;
			this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				this.deleteDao(id);
				this.getPassagePage(this.currentPage, 8);
			});
		},
		find: function() {
			this.getPassagePage(this.currentPage, 8);
		},
		refreshPassagePage: function() {
			this.getPassagePage(this.currentPage, 8);
		},
		getNewsTypeList: function() {
			this.$axios.get('/api/passageTypes').then(res => {
				if (res.data.code == OK) {
					this.newsTypeList = res.data.data;
				} else {
					this.$message.error(res.data.data);
				}
			});
		}
	},
	created() {
		this.getPassagePage(this.currentPage, 8);
		this.getNewsTypeList();
	},
	watch: {
		$route(to, from) {
			this.getPassagePage(this.currentPage, 8);
		}
	}
};
</script>
<style scoped="scoped"></style>
