<template>
	<el-form class="" :model="passage" label-width="80px">
		<el-form-item label="新闻标题"><el-input v-model="passage.title"></el-input></el-form-item>
		<el-form-item label="发布时间"><el-date-picker    type="date"  format="yyyy年MM月dd 日" value-format="yyyy年MM月dd 日" placeholder="选择日期" v-model="passage.publishTime"></el-date-picker></el-form-item>
		<quill-editor
			v-model="passage.content"
			ref="myQuillEditor"
			:options="editorOption"
			name="content"
		></quill-editor>
		</textarea>
		<el-form-item label="新闻类型" >
			<el-select  v-model="passage.passageTypeId" placeholder="请选择新闻类型">
				<el-option v-for="newsType in newsTypeList"  :key="newsType.id" :label="newsType.type" :value="newsType.id"></el-option>
			</el-select>
			
		</el-form-item>
		<el-form-item label="查看文件" v-if="fileList!=null">
			<div v-for="file in fileList" :key="file.id">
				<img :src="'/fileServer'+file.filePath" class="show-image" :alt="file.fileName" v-if="isImage(file.fileName)">
				<a :href="'/fileServer'+file.filePath" v-else>{{file.fileName}}</a>
			</div>
			
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
			fileList:[],
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
					this.fileList=this.passage.fileList;
					console.log(this.fileList)
					// this.initSelected();
				} else {
					this.$layer.msg(res.data.message, { icon: 5 });
				}
			});
		},
		initSelected:function () {
			this.passage.passageTypeId=this.passage.passageType.id;
		},
		isImage:function (fileName) {
			var ext = fileName.substring(fileName.lastIndexOf(".")+1);
			if(ext=="png"||ext=="jpg"){
				return true;
			}
			return false;
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
	
		goBack:function(){
			this.$router.back(-1)
		}
	},
	created() {
		var id = this.$route.query.id;
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
.show-image{
	width: 350px;
	height: 220px;
}
</style>
