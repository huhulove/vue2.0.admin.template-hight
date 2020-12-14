import Vue from 'vue';
import ElementUI from 'element-ui';
import { huploadConfigJson } from './util/htools.web';
import 'element-ui/lib/theme-chalk/index.css';
import './directives/index';
import './filters/index';
import App from './App.vue';
import router from './router';
import store from './store';

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
