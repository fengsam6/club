<template>
	<el-form :model="activity" label-width="100px">
		<el-form-item label="活动名称"><el-input v-model="activity.activityName"></el-input></el-form-item>
		<el-form-item label="活动举行时间"><el-date-picker type="date" placeholder="选择日期" v-model="activity.holdTime"></el-date-picker></el-form-item>
		<el-form-item label="活动地点"><el-input v-model="activity.site"></el-input></el-form-item>
		<quill-editor v-model="activity.introduce" :options="editorOption"></quill-editor>
		<el-form-item label="文章标题" prop="activityTypeId">
			<el-select v-model="activity.activityTypeId" placeholder="请选择活动类型">
				<el-option v-for="activityType in activityTypeList" :key="activityType.id" :label="activityType.type" :value="activityType.id"></el-option>
			</el-select>
		</el-form-item>
		<el-form-item>
			<el-button type="primary" @click="update">更新</el-button>
			<el-button @click="goBack">返回</el-button>
		</el-form-item>
	</el-form>
</template>

<script>
const OK = 200;
export default {
	data() {
		return {
			activity: {},
			activityTypeList: [],
			editorOption: {
				placeholder: '输入活动简介：',
				// 编辑器的配置
				// something config
				theme: 'snow'
			}
		};
	},
	methods: {
		get: function(id) {
			this.$axios.get('/api/activities/' + id).then(res => {
				console.log(res.data);
				if (res.data.code == OK) {
					this.activity = res.data.data;
				} else {
					this.$message.error(res.data.message, { icon: 5 });
				}
			});
		},
		update: function() {
			console.log(this.activity);
			this.$axios.put('/api/activities/', this.activity).then(res => {
				console.log(this.activity);
				console.log(res.data);
				if (res.data.code == OK) {
					this.$message.success('更新文章成功');
					this.$router.push({name:"ActivityList"})
				} else {
					this.$message.error(res.data.message);
				}
			});
		},
		getActivityTypeList: function() {
			this.$axios.get('/api/activityTypes').then(res => {
				if (res.data.code == OK) {
					this.activityTypeList = res.data.data;
				} else {
					this.$message.error(res.data.message);
				}
			});
		},
		goBack:function(){
			this.$router.back(-1)
		}
	},
	created() {
		this.getActivityTypeList();
		var id = this.$route.params.id;
		this.get(id);
	},
	watch: {
		$route(to, from) {
			this.getActivityTypeList();
		}
	}
};
</script>

<style scoped="scoped">
.title {
	display: block;
	font-size: 24px;
	color: #9a0e14;
	margin-top: 10px;
}
.content {
	line-height: 150%;
	pupdateing: 10px 20px;
	text-indent: 35px;
	text-align: left;
}
</style>
