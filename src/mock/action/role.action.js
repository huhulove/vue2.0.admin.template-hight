import Mock from 'mockjs';
import { hgetAllParams, hgetStorage } from '../../util/htools.web';
// eslint-disable-next-line import/no-cycle
import { filterCompanyData } from './company.action';
// eslint-disable-next-line import/no-cycle
import roleData from '../data/role.data';

/* 角色列表 */
export const roleListService = options => {
	const { name, pageIndex, pageSize, companyId } = JSON.parse(options.body);
	const loginCompanyId = hgetStorage('companyId');
	const userRoles = hgetStorage('roleIds');
	const companyRoles = {
		records: roleData
	};
	if (loginCompanyId !== 0 || (loginCompanyId === 0 && userRoles.indexOf(1) === -1)) {
		companyRoles.records = roleData.filter(item => {
			return item.companyId === loginCompanyId;
		});
	}
	if (companyId !== '') {
		companyRoles.records = roleData.filter(item => {
			return item.companyId === companyId;
		});
	}
	const searchResult = companyRoles.records.filter(item => {
		return item.name.indexOf(name) > -1;
	});
	searchResult.sort((a, b) => {
		return b.id - a.id;
	});
	const records = [];
	searchResult.forEach((item, index) => {
		if (index >= (pageIndex - 1) * pageSize && index <= pageIndex * pageSize - 1) {
			records.push({ ...item });
		}
	});
	records.forEach(role => {
		filterCompanyData().forEach(company => {
			if (role.companyId === company.id) {
				role.company = { ...company };
				delete role.companyId;
			}
		});
	});
	return Mock.mock({
		code: 200,
		msg: '操作成功',
		result: {
			current: pageIndex,
			pages: Math.ceil(searchResult.length / pageSize),
			records: records,
			size: pageSize,
			total: searchResult.length
		}
	});
};
/* 角色添加 */
export const roleAddService = options => {
	const body = JSON.parse(options.body);
	if (roleData.length === 0) {
		body.id = 1;
	} else {
		body.id = roleData[roleData.length - 1].id + 1;
	}
	body.createDate = Mock.Random.now();
	body.companyId = hgetStorage('companyId');
	body.powerCodes = [];
	roleData.push(body);
	return Mock.mock({
		code: 200,
		msg: '操作成功',
		result: body.id
	});
};
/* 角色修改 */
export const roleEditService = options => {
	const body = JSON.parse(options.body);
	body.updateDate = Mock.Random.now();
	roleData.forEach((item, index) => {
		if (item.id === body.id) {
			roleData[index] = body;
		}
	});
	return Mock.mock({
		code: 200,
		msg: '操作成功',
		result: body.id
	});
};
/* 角色删除 */
export const roleDeleteService = options => {
	const { ids } = JSON.parse(options.body);
	const currentUserRole = hgetStorage('roleIds');
	let isDelFlag = true;
	ids.forEach(id => {
		if (currentUserRole.indexOf(id) > -1) {
			isDelFlag = false;
		}
	});
	if (!isDelFlag) {
		return Mock.mock({
			code: 400,
			msg: '当前登录人不能删除其关联角色',
			result: ids
		});
	}
	for (let i = 0; i < roleData.length; i++) {
		const item = roleData[i];
		if (ids.indexOf(item.id) > -1) {
			roleData.splice(i, 1);
			i--;
		}
	}
	return Mock.mock({
		code: 200,
		msg: '操作成功',
		result: ids
	});
};
/* 角色赋权限 */
export const roleAuthorizeService = options => {
	const body = JSON.parse(options.body);
	body.updateDate = Mock.Random.now();
	roleData.forEach((item, index) => {
		if (item.id === body.id) {
			roleData[index] = { ...item, ...body };
		}
	});
	return Mock.mock({
		code: 200,
		msg: '操作成功',
		result: body.id
	});
};
/* 角色详情 */
export const roleDetailService = options => {
	const { id } = hgetAllParams(options.url);
	const result = {
		...roleData.filter(item => {
			return item.id === Number(id);
		})[0]
	};
	return Mock.mock({
		code: 200,
		msg: '操作成功',
		result: { ...result }
	});
};
/* 过滤角色数据 */
export const filterRoleData = () => {
	return roleData.map(item => {
		return {
			id: item.id,
			name: item.name,
			powerCodes: item.powerCodes
		};
	});
};
/* 返回所有角色的ID */
export const roleDataIds = () => {
	return roleData.map(item => {
		return item.id;
	});
};
/* 查询所有角色 */
export const allRoleData = () => {
	return Mock.mock({
		code: 200,
		msg: '操作成功',
		result: roleData
	});
};
