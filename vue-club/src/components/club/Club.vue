<template>
	<div class="" v-if="club != null">
		<span class="title">{{ club.name }}</span>
		<div v-html="club.introduce" class="content"></div>
	</div>
</template>

<script>
const OK = 200;
export default {
	data() {
		return {
			club: {}
		};
	},
	methods: {
		get: function() {
			var num = this.$route.params.num;
			this.$axios.get('/api/clubs/' + num).then(res => {
				console.log(res.data);
				if (res.data.code == OK) {
					this.club = res.data.data;
				} else {
					this.$layer.alert(res.data.data);
				}
			});
		}
	},
	created() {
		this.get();
	},
	watch: {
		$route(to, from) {
			this.get();
		}
	}
};
</script>

<style></style>
