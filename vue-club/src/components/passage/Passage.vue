<template>
	<div class="" v-if="passage != null">
		<span class="title">{{ passage.title }}</span>
		<div class="time-wrap">
			发布时间:
			<span class="time">{{ passage.publishTime }}</span>
		</div>
		<div v-html="passage.content" class="content"></div>
		
			<div v-for="file in fileList" :key="file.id">
				<img :src="'/fileServer' + file.filePath" class="show-image" :alt="file.fileName" v-if="isImage(file.fileName)" />
				<a :href="'/fileServer' + file.filePath" v-else>{{ file.fileName }}</a>
			</div>
		
		<Share />
	</div>
</template>

<script>
import Share from '@/components/common/Share.vue';
const OK = 200;
export default {
	data() {
		return {
			passage: {},
			fileList:[]
		};
	},
	components: { Share },
	methods: {
		get: function(id) {
			this.$axios.get('/api/passages/' + id).then(res => {
				// this.$layer.msg(res.data);
				console.log(res.data);
				if (res.data.code == OK) {
					this.passage = res.data.data;
					this.fileList=this.passage.fileList;
				} else {
					this.$layer.alert('error');
				}
			});
		},
		isImage: function(fileName) {
			var ext = fileName.substring(fileName.lastIndexOf('.') + 1);
			if (ext == 'png' || ext == 'jpg') {
				return true;
			}
			return false;
		}
	},
	created() {
		var id = this.$route.params.id;
		this.get(id);
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
.title {
	display: block;
	font-size: 24px;
	color: #9a0e14;
	margin-top: 10px;
}
.time-wrap {
	float: right;
	margin-right: 100px;
}
.time {
	display: inline-block;
	margin-top: 20px;
	margin-left: 15px;
	font-size: 18px;
}
.content {
	line-height: 150%;
	padding: 20px;
	text-indent: 35px;
	text-align: left;
}
.show-image{
	width: 420px;
	height: 360px;
}
</style>
