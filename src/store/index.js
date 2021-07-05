import Vue from 'vue';
import Vuex from 'vuex';
// eslint-disable-next-line import/no-cycle
import userStore from './modules/user.store';

Vue.use(Vuex);

export default new Vuex.Store({
	modules: {
		userStore: userStore
	}
});
