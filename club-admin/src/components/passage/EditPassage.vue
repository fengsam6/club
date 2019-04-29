<template>
	<el-form class="" :model="passage" label-width="80px">
		<el-form-item label="文章标题"><el-input v-model="passage.title"></el-input></el-form-item>
		<el-form-item label="活动时间"><el-date-picker type="date" placeholder="选择日期" v-model="passage.publishTime"></el-date-picker></el-form-item>
		<quill-editor
			v-model="passage.content"
			ref="myQuillEditor"
			:options="editorOption"
			@blur="onEditorBlur($event)"
			@focus="onEditorFocus($event)"
			@change="onEditorChange($event)"
			name="content"
		></quill-editor>
		</textarea>
		<el-form-item label="新闻类型" >
			<el-select v-model="passage.passageTypeId" placeholder="请选择新闻类型">
				<el-option v-for="newsType in newsTypeList"  :key="newsType.id" :label="newsType.type" :value="newsType.id"></el-option>
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
			passage: {},
			newsTypeList: [],
			editorOption: {
				placeholder: '输入新闻内容：',
				// 编辑器的配置
				// something config
			theme:'snow'
			}
		};
	},
	components: {
		props: ['id']
	},
	methods: {
		get: function(id) {
			this.$axios.get('/api/passages/' + id).then(res => {
				console.log(res.data);
				if (res.data.code == OK) {
					this.passage = res.data.data;
				} else {
					this.$layer.msg(res.data.message, { icon: 5 });
				}
			});
		},
		update: function() {
			this.$axios
				.put('/api/passages/', 
					 this.passage
				)
				.then(res => {
					console.log(this.passage);
					// this.$layer.msg(res.data);
					console.log(res.data);
					if (res.data.code == OK) {
						this.$message.success(	'更新文章成功');
						this.$router.push({name:"PassageList"})
					} else {
						this.$message.error(res.data.message);
					}
				}).catch(function (error) {
                    this.$message.error(error);
                  });;
		},
		getNewsTypeList: function() {
			this.$axios.get('/api/passageTypes').then(res => {
				if (res.data.code == OK) {
					this.newsTypeList = res.data.data;
				} else {
					this.$message.error(res.data.data);
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
		var id = this.$route.params.id;
		this.get(id);
		this.getNewsTypeList();
		
	},
	watch: {
		$route(to, from) {
			var id = this.$route.params.id;
			this.get(id);
		}
	}
};
</script>

<style scoped="scoped">

</style>
