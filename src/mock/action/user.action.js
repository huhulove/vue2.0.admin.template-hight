import Mock from 'mockjs';
import { hgetAllParams, hgetStorage } from '../../util/htools.web';
import { changeTreeDataToChildren, getChildrenNodes } from '../../util/htools.tree';
// eslint-disable-next-line import/no-cycle
import { filterCompanyData } from './company.action';
// eslint-disable-next-line import/no-cycle
import { filterRoleData } from './role.action';
// eslint-disable-next-line import/no-cycle
import { filterDepartmentData, allDepartmentData } from './department.action';
// eslint-disable-next-line import/no-cycle
import userData from '../data/user.data';

/* 根据登录用户查询当前登录人信息 */
export const userLoginDetailService = () => {
	const uid = hgetStorage('token');
	const result = userData.filter(item => {
		return item.id === uid;
	})[0];

	const company = filterCompanyData().filter(item => {
		return item.id === result.companyId;
	})[0];
	result.company = company.name;
	result.role = [];
	result.powers = [];
	result.roleIds.forEach(roleId => {
		filterRoleData().forEach(role => {
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
	userData.forEach((item, index) => {
		if (item.id === id) {
			userData[index] = {
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
	userData.forEach((item, index) => {
		if (item.id === (uid || hgetStorage('token'))) {
			userData[index].avatar = avatar;
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
	const { nickName, pageIndex, pageSize, companyId } = JSON.parse(options.body);
	// 企业管理员角色ID
	const companyAdminRoles = [2];
	const loginCompanyId = hgetStorage('companyId');
	const companyUsers = {
		records: userData
	};
	if (loginCompanyId !== 0) {
		companyUsers.records = userData.filter(item => {
			return item.companyId === loginCompanyId;
		});
	}
	if (companyId !== '') {
		companyUsers.records = userData.filter(item => {
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
			filterDepartmentData().forEach(department => {
				if (department.id === departmentId && department.dutyPeopleId === userId) {
					isDutyPeople = true;
				}
			});
			// 是部门负责人
			if (isDutyPeople) {
				const departmentTemp = changeTreeDataToChildren(allDepartmentData().result);
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

	records.forEach(user => {
		filterCompanyData().forEach(company => {
			if (company.id === user.companyId) {
				user.company = { ...company };
				delete user.companyId;
			}
		});
	});
	records.forEach(user => {
		user.role = [];
		user.roleIds.forEach(roleId => {
			filterRoleData().forEach(role => {
				if (roleId === role.id) {
					user.role.push({ ...role });
				}
			});
		});
		delete user.roleIds;
	});
	records.forEach(user => {
		filterDepartmentData().forEach(department => {
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
		...userData.filter(item => {
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
	body.id = userData[userData.length - 1].id + 1;
	body.companyId = body.companyId ? body.companyId : hgetStorage('companyId');
	userData.push(body);
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
	userData.forEach((item, index) => {
		if (item.id === body.id) {
			body.company = { ...userData[index].company };
			userData[index] = body;
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
	for (let i = 0; i < userData.length; i++) {
		const item = userData[i];
		if (ids.indexOf(item.id) > -1) {
			userData.splice(i, 1);
			i--;
		}
	}
	return Mock.mock({
		code: 200,
		msg: '操作成功',
		result: ids
	});
};
/* 用户修改密码 */
export const userPasswordEditService = options => {
	const { id, userPwdNew, userPwdOld } = JSON.parse(options.body);
	const result = userData.filter(item => {
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
/* 过滤用户数据 */
export const filterUserData = () => {
	return userData.map(item => {
		return {
			id: item.id,
			name: item.nickName,
			roleIds: item.roleIds
		};
	});
};
/* 查询所有用户数据 */
export const allUserData = () => {
	return Mock.mock({
		code: 200,
		msg: '操作成功',
		result: userData
	});
};
