// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import axios from 'axios'
import layer from 'vue-layer'

import VueCookies from 'vue-cookies'
Vue.use(VueCookies)
import global_variable from "./js/global_variable";
Vue.prototype.GLOBAL=global_variable

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueQuillEditor from "vue-quill-editor"
//引入全局公共样式
import "./css/common.css"
// require styles 引入样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

Vue.use(VueQuillEditor)

//开启debug模式
Vue.config.debug = true;
axios.defaults.withCredentials=true;
Vue.prototype.$axios = axios

Vue.prototype.$layer = layer(Vue);

Vue.use(ElementUI);

Vue.config.productionTip = false

const AuthenticationFailCode = 3005

axios.interceptors.response.use(response => {
	console.log(response)
	if(response.data.code == AuthenticationFailCode){
		// this.$message.error(response.data.message);
		router.push({name:"Login"})
	}
	return response;
}, error => {
	console.log(error)
	if (error.response) {

	}
	return Promise.reject(error.response.data) // 返回接口返回的错误信息
});


/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	components: {
		App
	},
	template: '<App/>'
})
