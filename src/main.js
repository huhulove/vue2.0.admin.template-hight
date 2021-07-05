import Vue from 'vue';
import ElementUI from 'element-ui';
import echarts from 'echarts';
import { huploadConfigJson } from './util/htools.web';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'element-ui/lib/theme-chalk/index.css';
import './directives/index';
import './filters/index';
import App from './App.vue';
import router from './router';
import store from './store';
// 引入mockjs
import './mock/index';

Vue.prototype.$echarts = echarts;
Vue.config.productionTip = false;

Vue.use(ElementUI, { size: 'small' });

new Vue({
	router,
	store,
	render: h => {
		return h(App);
	},
	async created() {
		Vue.prototype.$envConfig = await huploadConfigJson();
	}
}).$mount('#app');
