<template>
	<el-table :data="activityTypeList" stripe style="width:100%" border size="mini">
		<el-table-column prop="id" label="id" ></el-table-column>
		<el-table-column prop="type" label="活动类型" ></el-table-column>
		<el-table-column fixed="right" label="操作" width="460">
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
				activityTypeList: [],
				activeIndex: '1'
			};
		},
		methods: {
			getActivityTypeList: function() {
				this.$axios.get('/api/activityTypes').then(res => {
					if (res.data.code == OK) {
						this.activityTypeList = res.data.data;
					} else {
						// this.$layer.alert(res.data.data);
					}
				});
			}
		},
		created() {
			this.getActivityTypeList();
		}
	};
</script>

<style scoped="scoped">

</style>
