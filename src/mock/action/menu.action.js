import Mock from 'mockjs';

import { hgetAllParams, hgetStorage, harrIntersect } from '../../util/htools.web';
import { changeTreeDataToChildren } from '../../util/htools.tree';
import menuData from '../data/menu.data';
import { filterRoleData } from './role.action';
import { filterUserData } from './user.action';

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
	const user = filterUserData().filter(item => {
		return item.id === uid;
	})[0];
	const userRole = filterRoleData().filter(item => {
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
	for (let i = 0; i < menuData.length; i++) {
		const item = menuData[i];
		if (ids.indexOf(item.id) > -1) {
			menuData.splice(i, 1);
			i--;
		}
	}
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
		result: id
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
