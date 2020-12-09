const afterRouter = router => {
	router.afterEach(to => {
		document.title = to.meta.title;
	});
};

export default afterRouter;
