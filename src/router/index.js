import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes';

/* 路由守卫 */
// eslint-disable-next-line import/no-cycle
import beforeRouter from './before.router';
import afterRouter from './after.router';

Vue.use(VueRouter);

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
});

// 路由前置守卫
beforeRouter(router);
// 路由后置钩子
afterRouter(router);

export default router;
