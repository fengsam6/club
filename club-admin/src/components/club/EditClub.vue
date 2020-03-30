<template>
	<el-form class="" :model="club" label-width="80px">
		<el-form-item label="社团编号"><el-input v-model="club.num"></el-input></el-form-item>
		<el-form-item label="社团名称"><el-input v-model="club.name"></el-input></el-form-item>
		<el-form-item label="社团创建时间" label-width="120px"><el-date-picker type="date" placeholder="选择日期" v-model="club.createTime"></el-date-picker></el-form-item>
		<quill-editor
			v-model="club.introduce"
			ref="myQuillEditor"
			:options="editorOption"
			@blur="onEditorBlur($event)"
			@focus="onEditorFocus($event)"
			@change="onEditorChange($event)"
		></quill-editor>
		</textarea>
		<el-form-item label="社团类型" >
			<el-select v-model="club.clubTypeId" placeholder="请选择社团类型">
				<el-option v-for="clubType in clubTypeList"  :key="clubType.id" :label="clubType.type" :value="clubType.id"></el-option>
			</el-select>
			
		</el-form-item>
		<el-form-item >
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
			club: {},
			clubTypeList: [],
			editorOption: {
				placeholder: '输入社团内容：',
				// 编辑器的配置
			theme:'snow'
			}
		};
	},
	components: {
	},
	methods: {
		get: function(num) {
			this.$axios.get('/api/clubs/' + num).then(res => {
				console.log(res.data);
				if (res.data.code == OK) {
					this.club = res.data.data;
				} else {
					this.$layer.msg(res.data.message, { icon: 5 });
				}
			});
		},
		update: function() {
			this.$axios
				.put('/api/clubs/', 
					 this.club
				)
				.then(res => {
					console.log(this.club);
					// this.$layer.msg(res.data);
					console.log(res.data);
					if (res.data.code == OK) {
						this.$message({
							message: '更新社团成功',
							type: 'success'
						});
						setTimeout(()=>{
							this.$router.push({name:"ClubList"})
						},2000)
					} else {
						this.$message.error(res.data.message);
					}
				}).catch(function (error) {
                    this.$message.error(error);
                  });
		},
		getClubTypeList: function() {
			this.$axios.get('/api/clubTypes').then(res => {
				if (res.data.code == OK) {
					this.clubTypeList = res.data.data;
				} else {
				this.$message.error(res.data.message);
				}
			});
		},
		onEditorBlur() {
			//失去焦点事件
		},
		onEditorFocus() {
			//获得焦点事件
		},
		onEditorChange() {
			//内容改变事件
		},
		goBack:function(){
			this.$router.back(-1)
		}
	},
	created() {
		var num= this.$route.query.num;
		this.get(num);
		this.getClubTypeList();
		
	},
	watch: {
		$route(to, from) {
			var num= this.$route.params.num;
			this.get(num);
		}
	}
};
</script>

<style scoped="scoped">

</style>
