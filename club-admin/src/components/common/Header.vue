<template>
	<div class="header">
		<span class="sys-name">
			<router-link :to="{ name: 'Home' }">社团管理系统后台</router-link>

		</span>
		<div class="right-menue" style=”clear:both”>
			<span class="name">{{ user.name }}，你好</span>
			<!-- <span class="role">登录身份{{ user.role }}</span> -->
			<span @click="logout" class="logout">退出</span>
		</div>
		 <div style=”clear:both”></div>
	</div>
</template>

<script>
const OK = 200;
export default {
	data() {
		return { user: {} };
	},
	methods: {
		getUser: function(token) {
			this.$axios
				.get('/api/users/getUser', {
					params: {
						token: token
					}
				})
				.then(res => {
					if (res.data.code == OK) {
						this.user = res.data.data;
					} else {
						this.$message.error(res.data.message);
					}
				});
		},
		logout:function(){
			this.$cookies.remove("token");
			this.$message.info("成功退出系统")
			this.$router.push({name:"Login"})
		}
	},
	created: function() {
		var token = this.$cookies.get('token');
		console.log(token);
		this.getUser(token);
	},
	mounted: function() {}
};
</script>

<style scoped="scoped">
.header {
	position: fixed;
  top: 0;
  left: 200px;
  right: 0;
	height: 60px;
	background-color: #2f4056;
}
.header .sys-name {
	display: block;
	height: 60px;
	width: 250px;

	line-height: 60px;
	margin-left: 20px;
	color: white;
}
.header .sys-name a {
	color: #fff;
	text-decoration: none;
	font-size: 16px;
}
.right-menue{
	width: 300px;
	height: 55px;
	line-height: 60px;
	margin-top: -60px;
	float: right;
	color: #eee;
	/* background-color: #13CE66; */
}
.header .name {
	/* float: left;
	background-color: #007aff;
}

.header .role {
	/* float: left; */
	/* background-color: #007aff; */
}
.logout{
	cursor: pointer;
	margin-left: 30px;
}
</style>
