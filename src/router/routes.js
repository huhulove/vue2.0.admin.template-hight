import Login from '../views/layout/Login.vue';
import v404 from '../views/layout/404.vue';
import Layout from '../views/layout/Layout.vue';
import Home from '../views/layout/Home.vue';
/* 系统管理 */
import UserManager from '../views/systemManager/UserManager';
import RoleManager from '../views/systemManager/RoleManager';
import AuthorizeManager from '../views/systemManager/AuthorizeManager';
import MenuManager from '../views/systemManager/MenuManager';
import Department from '../views/systemManager/Department';
import ProfileInformation from '../views/systemManager/ProfileInformation';
/* 基础数据 */
import CompanyManager from '../views/baseData/Company';

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
					title: '首页',
					aside: {
						isMenu: false
					}
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
					title: ''
				},
				component: MenuManager
			},
			{
				path: 'system/department', // 部门管理
				name: 'Department',
				meta: {
					title: '部门管理'
				},
				component: Department
			},
			{
				path: 'company/companyManager',
				name: 'CompanyManager',
				meta: {
					title: '公司管理'
				},
				component: CompanyManager
			},
			{
				path: 'system/profile',
				name: 'Profile',
				meta: {
					title: '个人信息',
					/* tab: {
						isAdd: false,
						parentRouteName: 'UserManager'
					}, */
					aside: {
						isMenu: false
						/* activedRouteName: 'UserManager' */
					}
				},
				component: ProfileInformation
			},
			{
				path: '404',
				name: '404',
				meta: {
					title: '404',
					tab: {
						isAdd: true
					}
				},
				component: v404
			}
		]
	},
	{
		path: '*',
		name: '404',
		meta: {
			title: '404'
		},
		component: v404
	}
];

export default routes;
