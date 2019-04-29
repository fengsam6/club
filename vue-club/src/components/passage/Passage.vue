<template>
	<div class="" v-if="passage != null">
		<span class="title">{{ passage.title }}</span>
		<div class="time-wrap">
			发布时间:<span class="time">{{ passage.publishTime }}</span>
		</div>
		<div v-html="passage.content" class="content"></div>
	</div>
</template>

<script>
const OK = 200;
export default {
	data() {
		return {
			passage: {}
		};
	},
	methods: {
		get: function(id) {
			this.$axios.get('/api/passages/' + id).then(res => {
				// this.$layer.msg(res.data);
				console.log(res.data);
				if (res.data.code == OK) {
					this.passage = res.data.data;
				} else {
					this.$layer.alert('error');
				}
			});
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
.time-wrap{
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
</style>
