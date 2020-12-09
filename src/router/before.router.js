import { hgetStorage } from '../util/htools.web';

const beforeRouter = router => {
	const whitePageList = ['/login'];
	router.beforeEach((to, from, next) => {
		if (whitePageList.indexOf(to.path) > -1) {
			next();
		} else if (!hgetStorage('token')) {
			router.push(`/login?redirect=${to.fullPath}`);
		} else {
			next();
		}
	});
};

export default beforeRouter;
