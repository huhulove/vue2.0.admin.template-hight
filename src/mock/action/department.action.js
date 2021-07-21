import Mock from 'mockjs';

import { hgetAllParams, hgetStorage } from '../../util/htools.web';
import departmentData from '../data/department.data';
// eslint-disable-next-line import/no-cycle
import { filterUserData } from './user.action';
// eslint-disable-next-line import/no-cycle
import { filterCompanyData } from './company.action';

/* 部门列表 */
export const departmentListService = options => {
	const { name, pageIndex, pageSize, companyId } = JSON.parse(options.body);
	const loginCompanyId = hgetStorage('companyId');
	const userRoles = hgetStorage('roleIds');
	let companyDepartments = departmentData;
	if (loginCompanyId !== 0 || (loginCompanyId === 0 && userRoles.indexOf(1) === -1)) {
		companyDepartments = departmentData.filter(item => {
			return item.companyId === loginCompanyId;
		});
	}
	if (companyId !== '') {
		companyDepartments = departmentData.filter(item => {
			return item.companyId === companyId;
		});
	}
	const searchResult = companyDepartments.filter(item => {
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
	records.forEach(item => {
		if (!item.dutyPeopleId) {
			item.dutyPeople = {};
		} else {
			filterUserData().forEach(user => {
				if (item.dutyPeopleId === user.id) {
					item.dutyPeople = { ...user };
				}
			});
		}
		delete item.dutyPeopleId;
	});
	records.forEach(department => {
		filterCompanyData().forEach(company => {
			if (company.id === department.companyId) {
				department.company = { ...company };
				delete department.companyId;
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
/* 部门添加 */
export const departmentAddService = options => {
	const body = JSON.parse(options.body);
	body.createDate = Mock.Random.now();
	body.id = departmentData[departmentData.length - 1].id + 1;
	body.companyId = hgetStorage('companyId');
	departmentData.push(body);
	return Mock.mock({
		code: 200,
		msg: '操作成功',
		result: body.id
	});
};
/* 部门修改 */
export const departmentEditService = options => {
	const body = JSON.parse(options.body);
	body.updateDate = Mock.Random.now();
	departmentData.forEach((item, index) => {
		if (item.id === body.id) {
			departmentData[index] = body;
		}
	});
	return Mock.mock({
		code: 200,
		msg: '操作成功',
		result: body.id
	});
};
/* 部门详情 */
export const departmentDetailService = options => {
	const { id } = hgetAllParams(options.url);
	const result = {
		...departmentData.filter(item => {
			return item.id === Number(id);
		})[0]
	};
	return Mock.mock({
		code: 200,
		msg: '操作成功',
		result: result
	});
};
/* 部门删除 */
export const deleteList = ids => {
	for (let i = 0; i < departmentData.length; i++) {
		const item = departmentData[i];
		if (ids.indexOf(item.id) > -1) {
			departmentData.splice(i, 1);
			i--;
		}
	}
	const newIds = [];
	departmentData.forEach(item => {
		if (ids.indexOf(item.parentId) > -1) {
			newIds.push(item.id);
		}
	});
	if (newIds.length !== 0) {
		deleteList(newIds);
	}
};
export const departmentDeleteService = options => {
	const { ids } = JSON.parse(options.body);
	deleteList(ids);
	return Mock.mock({
		code: 200,
		msg: '操作成功',
		result: ids
	});
};
/* 过滤部门数据 */
export const filterDepartmentData = () => {
	return departmentData.map(item => {
		return {
			id: item.id,
			name: item.name,
			dutyPeopleId: item.dutyPeopleId
		};
	});
};
/* 查询所有部门 */
export const allDepartmentData = () => {
	return Mock.mock({
		code: 200,
		msg: '操作成功',
		result: departmentData
	});
};
