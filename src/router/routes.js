import Login from '../views/Login.vue';
import v404 from '../views/404.vue';
import Layout from '../views/Layout.vue';
import Home from '../views/Home.vue';
/* 系统管理 */
import UserManager from '../views/systemManager/UserManager';
import RoleManager from '../views/systemManager/RoleManager';
import AuthorizeManager from '../views/systemManager/AuthorizeManager';
import MenuManager from '../views/systemManager/MenuManager';

/* 日志管理 */
import SystemLog from '../views/logManager/SystemLog';

/* WebServer 临时测试websocket */
import WebServer from '../views/webServer/WebServer';

const routes = [
	{
		path: '/login',
		name: 'Login',
		meta: {
			title: '登录'
		},
		component: Login
	},
	{
		path: '/404',
        name: '404',
        meta: {
			title: '404'
		},
		component: v404
	},
	{
		path: '/ws', // 临时测试websocket
        name: 'WebServer',
        meta: {
			title: 'WebServer'
		},
		component: WebServer
	},
	{
		path: '/',
		redirect: '/home',
		name: 'Layout',
		component: Layout,
		children: [
			{
				path: 'home',
				name: 'Home',
				meta: {
					title: '首页'
				},
				component: Home
			},
			{
				path: 'system/userManager',
                name: 'UserManager',
                meta: {
					title: '用户管理'
				},
				component: UserManager
			},
			{
				path: 'system/roleManager',
                name: 'RoleManager',
                meta: {
					title: '角色管理'
				},
				component: RoleManager
			},
			{
				path: 'system/authorizeManager',
                name: 'AuthorizeManager',
                meta: {
					title: '权限管理'
				},
				component: AuthorizeManager
			},
			{
				path: 'system/menuManager',
                name: 'MenuManager',
                meta: {
					title: '菜单管理'
				},
				component: MenuManager
			},
			{
				path: 'log/system',
                name: 'SystemLog',
                meta: {
					title: '系统日志'
				},
				component: SystemLog
			}
		]
	}
];

export default routes;
