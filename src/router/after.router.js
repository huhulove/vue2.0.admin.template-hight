import { huploadConfigJson } from '@u/htools.web';

let envConfig = null;
const afterRouter = router => {
	router.afterEach(to => {
		if (envConfig) {
			document.title = `${envConfig.mainTitle}-${to.meta.title}`;
		} else {
			huploadConfigJson().then(res => {
				envConfig = res;
				document.title = `${res.mainTitle}-${to.meta.title}`;
			});
		}
	});
};

export default afterRouter;
