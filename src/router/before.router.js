import { hgetStorage } from '../util/htools.web';

// eslint-disable-next-line import/no-cycle
import store from '../store/index';

const beforeRouter = router => {
	const whitePageList = ['/login'];
	router.beforeEach((to, from, next) => {
		if (whitePageList.indexOf(to.path) > -1) {
			next();
		} else if (!hgetStorage('token')) {
			router.push(`/login?redirect=${to.fullPath}`);
		} else {
			const token = hgetStorage('token');
			store.commit('setToken', token);
			next();
		}
	});
};

export default beforeRouter;
