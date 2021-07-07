import Mock from 'mockjs';
import { hgetAllParams, hgetStorage, harrIntersect } from '../../util/htools.web';
import { changeTreeDataToChildren } from '../../util/htools.tree';
/* 引用数据 */
import { userDataRef } from './user.data';
import { roleDataRef } from './role.data';

let menuData = [
	{
		menuName: '系统管理',
		id: 1,
		pid: 0,
		url: '',
		routeName: '',
		powers: ['role:add', 'role:list', 'user:add', 'user:download', 'user:remove', 'user:select', 'user:update', 'user:UserRoleBind']
	},
	{
		menuName: '菜单管理123',
		id: 2,
		pid: 1,
		url: '/system/menuManager',
		routeName: 'MenuManager',
		powers: ['menu:add', 'menu:list', 'menu:menuJurisdictionsConfigure', 'menu:remove', 'menu:update']
	},
	{
		menuName: '权限管理',
		id: 3,
		pid: 1,
		url: '/system/authorizeManager',
		routeName: 'AuthorizeManager',
		powers: ['power:add', 'power:edit', 'power:list', 'power:remove', 'power:update']
	},
	{
		menuName: '用户管理',
		id: 4,
		pid: 1,
		url: '/system/userManager',
		routeName: 'UserManager',
		powers: ['user:add', 'user:download', 'user:list', 'user:remove', 'user:update', 'user:secret']
	},
	{
		menuName: '角色管理',
		id: 5,
		pid: 1,
		url: '/system/roleManager',
		routeName: 'RoleManager',
		powers: ['role:add', 'role:list', 'role:remove', 'role:rolePowerConf', 'role:update']
	},
	{
		menuName: '部门管理',
		id: 6,
		pid: 1,
		url: '/system/department',
		routeName: 'Department',
		powers: ['department:add', 'department:list', 'department:remove', 'department:rolePowerConf', 'department:update']
	},
	{
		menuName: '基础数据',
		id: 7,
		pid: 0,
		url: '',
		routeName: '',
		powers: ['company:add', 'company:list', 'company:remove', 'company:update']
	},
	{
		menuName: '公司管理',
		id: 8,
		pid: 7,
		url: '/company/companyManager',
		routeName: 'CompanyManager',
		powers: ['company:add', 'company:list', 'company:remove', 'company:update']
	}
];
const menuStatusArr = [0, 1];
menuData.forEach(item => {
	item.menuIcon = '0';
	item.createDate = Mock.Random.datetime();
	item.menuSort = Mock.Random.natural(1, 100);
	item.status = Mock.mock({
		'status|1': menuStatusArr
	}).status;
	item.isShow = 0;
	item.targetProperty = '_self';
	item.btnType = 0;
	item.isDel = 0;
	item.children = null;
});
/* 菜单列表 */
export const menuListService = () => {
	return Mock.mock({
		code: 200,
		msg: '操作成功',
		result: menuData
	});
};
/* 登录用户菜单权限 */
export const userMenuAuthorizeService = () => {
	const uid = hgetStorage('token');
	const user = userDataRef.filter(item => {
		return item.id === uid;
	})[0];
	const userRole = roleDataRef.filter(item => {
		return user.roleIds.indexOf(item.id) > -1;
	});
	const powerCodes = [];
	userRole.forEach(item => {
		powerCodes.push(...item.powerCodes);
	});
	const powerCodesSet = new Set();
	powerCodes.forEach(item => {
		powerCodesSet.add(item);
	});
	const powerCodesNew = [];
	powerCodesSet.forEach(item => {
		powerCodesNew.push(item);
	});
	const asideMenuData = [];
	menuData.forEach(item => {
		const powers = harrIntersect(item.powers, powerCodesNew);
		const asideMenuItem = { ...item };
		if (powers.length !== 0) {
			asideMenuItem.powers = [...powers];
			asideMenuData.push(asideMenuItem);
		}
	});
	return Mock.mock({
		code: 200,
		msg: '操作成功',
		result: changeTreeDataToChildren(asideMenuData)
	});
};
/* 菜单添加 */
export const menuAddService = options => {
	const body = JSON.parse(options.body);
	body.createDate = Mock.Random.now();
	body.id = menuData[menuData.length - 1].id + 1;
	body.children = null;
	body.isDel = 0;
	body.powers = [];
	menuData.push(body);
	return Mock.mock({
		code: 200,
		msg: '操作成功',
		result: body.id
	});
};
/* 菜单修改 */
export const menuEditService = options => {
	const body = JSON.parse(options.body);
	body.updateDate = Mock.Random.now();
	menuData.forEach((item, index) => {
		if (item.id === body.id) {
			menuData[index] = body;
		}
	});
	return Mock.mock({
		code: 200,
		msg: '操作成功',
		result: body.id
	});
};
/* 菜单删除 */
export const deleteList = ids => {
	menuData = menuData.filter(item => {
		return ids.indexOf(item.id) === -1;
	});
	const newIds = [];
	menuData.forEach(item => {
		if (ids.indexOf(item.pid) > -1) {
			newIds.push(item.id);
		}
	});
	if (newIds.length !== 0) {
		deleteList(newIds);
	}
};
export const menuDeleteService = options => {
	const { ids } = JSON.parse(options.body);
	deleteList(ids);
	return Mock.mock({
		code: 200,
		msg: '操作成功',
		result: ids
	});
};
/* 菜单赋权限 */
export const menuAuthorizeService = options => {
	const { id, menuJurisdictions } = JSON.parse(options.body);
	menuData.forEach(item => {
		if (item.id === id) {
			item.powers = [...menuJurisdictions];
		}
	});
	return Mock.mock({
		code: 200,
		msg: '操作成功',
		result: body.id
	});
};
/* 菜单详情 */
export const menuDetailService = options => {
	const { id } = hgetAllParams(options.url);
	const result = menuData.filter(item => {
		return item.id === Number(id);
	})[0];
	return Mock.mock({
		code: 200,
		msg: '操作成功',
		result: { ...result }
	});
};
export const menuDataRef = menuData;
export default menuListService;
