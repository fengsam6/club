<template>
	<el-table :data="newsTypeList" stripe style="width:100%" border size="mini">
		<el-table-column prop="id" label="id" ></el-table-column>
		<el-table-column prop="type" label="文章类型" ></el-table-column>
		<el-table-column fixed="right" label="操作" width="270">
			<template slot-scope="scope">
				<el-button type="primary" icon="el-icon-edit" @click="editPage(scope.row)" size="mini">编辑</el-button>
				<el-button type="success" icon="el-icon-plus" @click="addPage()" size="mini">添加</el-button>
				<el-button type="danger" icon="el-icon-delete" @click="deletePassage(scope.row)" size="mini">删除</el-button>
			</template>
		</el-table-column>
	</el-table>
</template>

<script>
const OK = 200;
export default {
	data() {
		return {
			newsTypeList: [],
			activeIndex: '1'
		};
	},
	methods: {
		getNewsTypeList: function() {
			this.$axios.get('/api/passageTypes').then(res => {
				if (res.data.code == OK) {
					this.newsTypeList = res.data.data;
				} else {
					this.$layer.alert(res.data.data);
				}
			});
		}
	},
	created() {
		this.getNewsTypeList();
	}
};
</script>

<style scoped="scoped">
</style>
