import Login from '../views/Login.vue';
import v404 from '../views/404.vue';
import Layout from '../views/Layout.vue';
import Home from '../views/Home.vue';
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

/* 日志 */
import LoginLog from '../views/log/LoginLog';
import OperationLog from '../views/log/OperationLog';
import ServiceLog from '../views/log/ServiceLog';

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
					tab: {
						isAdd: true,
						parentRouteName: ''
					}
				},
				component: Home
			},
			{
				path: 'system/userManager',
				name: 'UserManager',
				meta: {
					title: '用户管理',
					tab: {
						isAdd: true,
						parentRouteName: ''
					}
				},
				component: UserManager
			},
			{
				path: 'system/roleManager',
				name: 'RoleManager',
				meta: {
					title: '角色管理',
					tab: {
						isAdd: true,
						parentRouteName: ''
					}
				},
				component: RoleManager
			},
			{
				path: 'system/authorizeManager',
				name: 'AuthorizeManager',
				meta: {
					title: '权限管理',
					tab: {
						isAdd: true,
						parentRouteName: ''
					}
				},
				component: AuthorizeManager
			},
			{
				path: 'system/menuManager',
				name: 'MenuManager',
				meta: {
					title: '菜单管理',
					tab: {
						isAdd: true,
						parentRouteName: ''
					}
				},
				component: MenuManager
			},
			{
				path: 'system/department', // 部门管理
				name: 'Department',
				meta: {
					title: '部门管理',
					tab: {
						isAdd: true,
						parentRouteName: ''
					}
				},
				component: Department
			},
			{
				path: 'company/companyManager',
				name: 'CompanyManager',
				meta: {
					title: '公司管理',
					tab: {
						isAdd: true,
						parentRouteName: ''
					}
				},
				component: CompanyManager
			},
			{
				path: 'log/login', // 登录日志
				name: 'LoginLog',
				meta: {
					title: '登录日志',
					tab: {
						isAdd: true,
						parentRouteName: ''
					}
				},
				component: LoginLog
			},
			{
				path: 'log/operation', // 操作日志
				name: 'OperationLog',
				meta: {
					title: '操作日志',
					tab: {
						isAdd: true,
						parentRouteName: ''
					}
				},
				component: OperationLog
			},
			{
				path: 'log/service', // 错误日志
				name: 'ServiceLog',
				meta: {
					title: '错误日志',
					tab: {
						isAdd: true,
						parentRouteName: ''
					}
				},
				component: ServiceLog
			},
			{
				path: 'system/profile',
				name: 'Profile',
				meta: {
					title: '个人信息',
					tab: {
						isAdd: true,
						parentRouteName: 'UserManager'
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
						isAdd: true,
						parentRouteName: ''
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
