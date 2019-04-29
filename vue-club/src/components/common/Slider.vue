<template>
	<el-carousel indicator-position="outside">
		<el-carousel-item v-for="img in imgs" :key="img.id">
			<img :src="img.url" alt="">
		</el-carousel-item>
	</el-carousel>
</template>

<script>
	import Swiper from 'swiper';

	export default {
		data() {
			return {
				imgs: [{
						id: 1,
						url: '/static/img/carusel-img/c1.jpg'
					},
					{
						id: 2,
						url: '/static/img/carusel-img/c2.jpg'
					},
					{
						id: 3,
						url: '/static/img/carusel-img/c3.jpg'
					}
				]
			}
		},
		methods: {

		},
		mounted() {}
	}
</script>

<style scoped="scoped">
	@import 'swiper/dist/css/swiper.css';

	.el-carousel__item h3 {
		color: #475669;
		font-size: 18px;
		opacity: 0.75;
		line-height: 400px;
		margin: 0;
	}

	.el-carousel__item:nth-child(2n) {
		background-color: #99a9bf;
	}

	.el-carousel__item:nth-child(2n+1) {
		background-color: #d3dce6;
	}
</style>
