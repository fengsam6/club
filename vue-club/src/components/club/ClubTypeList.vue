<template>
	<el-menu default-active="1" class="el-menu-vertical-demo" active-text-color="#9a0e14"
	 text-color="#000" background-color="#eee">
		<el-menu-item v-for="(clubType, index) in clubTypeList" :key="index">
			<span slot="title">
				<router-link :to="{ name: 'ClubList', query: { typeId: clubType.id } }">{{ clubType.type }}</router-link>
			</span>
		</el-menu-item>
	</el-menu>
</template>

<script>
const OK = 200;
export default {
	data() {
		return {
			clubTypeList: []
			// activeIndex: '1'
		};
	},
	methods: {
		getClubTypeList: function() {
			this.$axios.get('/api/clubTypes').then(res => {
				if (res.data.code == OK) {
					this.clubTypeList = res.data.data;
				} else {
					this.$layer.alert(res.data.data);
				}
			});
		}
	},
	created() {
		this.getClubTypeList();
	}
};
</script>
<style scoped="scoped">
.router-link-exact-active.router-link-active {
	display: block;
	font-size: 120%;
	font-weight: 900;
	color: #9a0e14;
}
</style>
