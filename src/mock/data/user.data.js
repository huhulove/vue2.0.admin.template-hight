import Mock from 'mockjs';
import { hgetAllParams, hgetStorage } from '../../util/htools.web';
import { changeTreeDataToChildren, getChildrenNodes } from '../../util/htools.tree';
/* 引用数据 */
// eslint-disable-next-line import/no-cycle
import { roleDataRef } from './role.data';
// eslint-disable-next-line import/no-cycle
import { companyDataRef } from './company.data';
// eslint-disable-next-line import/no-cycle
import { departmentDataRef } from './department.data';

const userName = ['admin'];
const userStatus = [0, 1];
const roleDataIds = roleDataRef.map(item => {
	return item.id;
});
let roleData = [];
const filterRoleData = () => {
	roleData = roleDataRef.map(item => {
		return {
			id: item.id,
			name: item.name,
			powerCodes: item.powerCodes
		};
	});
};
let companyData = [];
const filterCompanyData = () => {
	companyData = companyDataRef.map(item => {
		return {
			id: item.id,
			name: item.name
		};
	});
};
let departmentData = [];
const filterDepartmentData = () => {
	departmentData = departmentDataRef.map(item => {
		return {
			id: item.id,
			name: item.name,
			dutyPeopleId: item.dutyPeopleId
		};
	});
};
const userData = Mock.mock({
	records: [
		{
			id: 1,
			nickName: Mock.Random.cname(),
			createDate: Mock.Random.datetime(),
			updateDate: null,
			userPwd: '123456',
			'userName|1': userName,
			'status|1': userStatus,
			remark: Mock.Random.title(),
			roleIds: roleDataIds,
			companyId: companyDataRef[0].id,
			departmentId: null,
			birthday: null,
			email: null,
			phone: null,
			avatar: null,
			sex: null
		}
	]
});
/* 根据登录用户查询当前登录人信息 */
export const userLoginDetailService = () => {
	const uid = hgetStorage('token');
	const result = userData.records.filter(item => {
		return item.id === uid;
	})[0];
	filterCompanyData();
	const company = companyData.filter(item => {
		return item.id === result.companyId;
	})[0];
	result.company = company.name;
	result.role = [];
	result.powers = [];
	filterRoleData();
	result.roleIds.forEach(roleId => {
		roleData.forEach(role => {
			if (roleId === role.id) {
				result.role.push(role.name);
				result.powers.push(...role.powerCodes);
			}
		});
	});
	result.role = result.role.join(',');
	return Mock.mock({
		code: 200,
		msg: '操作成功',
		result: { ...result }
	});
};
/* 修改登录用户基本信息 */
export const userEditLoginInfoService = options => {
	const id = hgetStorage('token');
	const body = JSON.parse(options.body);
	userData.records.forEach((item, index) => {
		if (item.id === id) {
			userData.records[index] = {
				...item,
				...body
			};
		}
	});
	return Mock.mock({
		code: 200,
		msg: '操作成功',
		result: null
	});
};
/* 修改登录用户头像 */
export const userEditAvatarService = options => {
	const { uid, avatar } = JSON.parse(options.body);
	userData.records.forEach((item, index) => {
		if (item.id === (uid || hgetStorage('token'))) {
			userData.records[index].avatar = avatar;
		}
	});
	return Mock.mock({
		code: 200,
		msg: '修改成功',
		result: uid
	});
};
/* 用户列表 */
export const userListService = options => {
	const { nickName, pageIndex, pageSize } = JSON.parse(options.body);
	const companyId = hgetStorage('companyId');
	const companyUsers = {
		records: userData.records
	};
	if (companyId !== 0) {
		companyUsers.records = userData.records.filter(item => {
			return item.companyId === companyId;
		});
	}
	let searchResult = companyUsers.records.filter(item => {
		return item.nickName.indexOf(nickName) > -1;
	});
	searchResult.sort((a, b) => {
		return b.id - a.id;
	});
	let records = [];
	searchResult.forEach((item, index) => {
		if (index >= (pageIndex - 1) * pageSize && index <= pageIndex * pageSize - 1) {
			records.push({ ...item });
		}
	});
	const departmentId = hgetStorage('departmentId');
	const userRoles = hgetStorage('roleIds');
	const userId = hgetStorage('token');
	//
	const companyAdminRoles = [2];
	let isCompanyAdmin = false;
	companyAdminRoles.forEach(companyRole => {
		if (userRoles.indexOf(companyRole) > -1) {
			isCompanyAdmin = true;
		}
	});
	// 企业管理员返回当前公司下所有员工

	// 当前登录人角色不是超级管理员
	// 当前登录人角色也不是企业管理员
	if (userRoles.indexOf(1) === -1 && !isCompanyAdmin) {
		if (departmentId) {
			let isDutyPeople = false; // true -> 部门负责人  false -> 不是部门负责人
			departmentData.forEach(department => {
				if (department.id === departmentId && department.dutyPeopleId === userId) {
					isDutyPeople = true;
				}
			});
			// 是部门负责人
			if (isDutyPeople) {
				const departmentTemp = changeTreeDataToChildren(departmentDataRef);
				const departmentIdsArr = [];
				getChildrenNodes(departmentTemp, departmentId, departmentIdsArr);
				records = records.filter(user => {
					return departmentIdsArr.indexOf(user.departmentId) > -1;
				});
			}
			// 不是部门负责人
			if (!isDutyPeople) {
				records = records.filter(user => {
					return user.departmentId === departmentId;
				});
			}
		} else {
			searchResult = [];
			records = [];
		}
	}

	filterCompanyData();
	records.forEach(user => {
		companyData.forEach(company => {
			if (company.id === user.companyId) {
				user.company = { ...company };
				delete user.companyId;
			}
		});
	});
	filterRoleData();
	records.forEach(user => {
		user.role = [];
		user.roleIds.forEach(roleId => {
			roleData.forEach(role => {
				if (roleId === role.id) {
					user.role.push({ ...role });
				}
			});
		});
		delete user.roleIds;
	});
	filterDepartmentData();
	records.forEach(user => {
		departmentData.forEach(department => {
			if (department.id === user.departmentId) {
				user.department = { ...department };
				delete user.departmentId;
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
/* 用户详情 */
export const userDetailService = options => {
	const { id } = hgetAllParams(options.url);
	const result = {
		...userData.records.filter(item => {
			return item.id === Number(id);
		})[0]
	};
	return Mock.mock({
		code: 200,
		msg: '操作成功',
		result: result
	});
};
/* 用户添加 */
export const userAddService = options => {
	const body = JSON.parse(options.body);
	body.createDate = Mock.Random.now();
	body.id = userData.records[userData.records.length - 1].id + 1;
	body.companyId = body.companyId ? body.companyId : hgetStorage('companyId');
	userData.records.push(body);
	return Mock.mock({
		code: 200,
		msg: '操作成功',
		result: body.id
	});
};
/* 用户编辑 */
export const userEditService = options => {
	const body = JSON.parse(options.body);
	body.updateDate = Mock.Random.now();
	userData.records.forEach((item, index) => {
		if (item.id === body.id) {
			body.company = { ...userData.records[index].company };
			userData.records[index] = body;
		}
	});
	return Mock.mock({
		code: 200,
		msg: '操作成功',
		result: body.id
	});
};
/* 用户删除 */
export const userDeleteService = options => {
	const { ids } = JSON.parse(options.body);
	const currentUid = hgetStorage('token');
	if (ids.indexOf(currentUid) > -1) {
		return Mock.mock({
			code: 400,
			msg: '当前登录人不能删除自己',
			result: ids
		});
	}
	userData.records = userData.records.filter(item => {
		return ids.indexOf(item.id) === -1;
	});
	return Mock.mock({
		code: 200,
		msg: '操作成功',
		result: ids
	});
};
/* 用户修改密码 */
export const userPasswordEditService = options => {
	const { id, userPwdNew, userPwdOld } = JSON.parse(options.body);
	const result = userData.records.filter(item => {
		return item.id === (id || hgetStorage('token'));
	})[0];
	if (!id) {
		if (result.userPwd === userPwdOld) {
			result.userPwd = userPwdNew;
		} else {
			return Mock.mock({
				code: 500,
				msg: '用户旧密码输入错误',
				result: id
			});
		}
	} else {
		result.userPwd = '123456';
	}
	result.updateDate = Mock.Random.now();
	return Mock.mock({
		code: 200,
		msg: '操作成功',
		result: id
	});
};
export const userDataRef = userData.records;
export default userLoginDetailService;
