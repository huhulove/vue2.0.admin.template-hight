import Mock from 'mockjs';
import { hgetAllParams, hgetStorage } from '../../util/htools.web';
/* 引用数据 */
// eslint-disable-next-line import/no-cycle
import { companyDataRef } from './company.data';
import { authorizeDataRef } from './authorize.data';

const roleNameArr = ['超级管理员'];
const roleStatus = [0, 1];
let companyData = [];
const filterCompanyData = () => {
	companyData = companyDataRef.map(item => {
		return {
			id: item.id,
			name: item.name
		};
	});
};
const authorizeData = authorizeDataRef.map(item => {
	return item.powerCode;
});
const roleData = Mock.mock({
	records: [
		{
			id: 1,
			createDate: Mock.Random.datetime(),
			updateDate: null,
			'name|1': roleNameArr,
			'status|1': roleStatus,
			remark: Mock.Random.title(),
			powerCodes: authorizeData,
			companyId: companyDataRef[0].id
		}
	]
});
/* 角色列表 */
export const roleListService = options => {
	const { name, pageIndex, pageSize } = JSON.parse(options.body);
	const companyId = hgetStorage('companyId');
	const companyRoles = {
		records: roleData.records
	};
	if (companyId !== 0) {
		companyRoles.records = roleData.records.filter(item => {
			return item.companyId === companyId;
		});
	}
	console.log(companyRoles);
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
	filterCompanyData();
	records.forEach(role => {
		companyData.forEach(company => {
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
	body.id = roleData.records[roleData.records.length - 1].id + 1;
	body.createDate = Mock.Random.now();
	body.powerCodes = [];
	roleData.records.push(body);
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
	roleData.records.forEach((item, index) => {
		if (item.id === body.id) {
			roleData.records[index] = body;
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
	roleData.records = roleData.records.filter(item => {
		return ids.indexOf(item.id) === -1;
	});
	return Mock.mock({
		code: 200,
		msg: '操作成功',
		result: ids
	});
};
/* 角色赋权限 */
export const roleAuthorizeService = options => {
	const body = JSON.parse(options.body);
	roleData.records.forEach((item, index) => {
		if (item.id === body.id) {
			roleData.records[index] = { ...item, ...body };
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
		...roleData.records.filter(item => {
			return item.id === Number(id);
		})[0]
	};
	return Mock.mock({
		code: 200,
		msg: '操作成功',
		result: { ...result }
	});
};
export const roleDataRef = roleData.records;
export default roleListService;
