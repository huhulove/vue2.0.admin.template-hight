const afterRouter = router => {
	router.afterEach(to => {
		document.title = `${globalConfig.mainTitle}-${to.meta.title}`;
	});
};

export default afterRouter;
