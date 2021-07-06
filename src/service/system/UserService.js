import { hgetRequest, hpostRequest } from '../../util/htools.axios';

/* 用户列表 */
export const userListService = data => {
	return new Promise(async resolve => {
		try {
			const dataJson = {
				nickName: '',
				pageIndex: '',
				pageSize: '',
				...data
			};
			const res = await hpostRequest('user/systemUserAllQuery', dataJson);
			res.records.forEach(item => {
				item.roleIds = item.role.map(item => {
					return item.id;
				});
				item.roleNames = item.role.map(item => {
					return item.name;
				});
			});
			resolve(res);
		} catch (error) {
			console.log(error);
		}
	});
};
/* 用户添加 */
export const userAddService = data => {
	return new Promise(async resolve => {
		try {
			const dataJson = {
				userName: '',
				userPwd: '',
				nickName: '',
				status: 0,
				companyId: 0,
				remark: '',
				roleIds: [],
				...data
			};
			const res = await hpostRequest('user/systemUserAdd', dataJson);
			resolve(res);
		} catch (error) {
			console.log(error);
		}
	});
};
/* 用户编辑 */
export const userEditService = data => {
	return new Promise(async resolve => {
		try {
			const dataJson = {
				id: '',
				userName: '',
				userPwd: '',
				nickName: '',
				status: 0,
				companyId: 0,
				remark: '',
				roleIds: [],
				...data
			};
			const res = await hpostRequest('user/systemUserInfoUpdate', dataJson);
			resolve(res);
		} catch (error) {
			console.log(error);
		}
	});
};
/* 用户删除 */
export const userDeleteService = data => {
	return new Promise(async resolve => {
		try {
			const dataJson = {
				ids: [],
				...data
			};
			const res = await hpostRequest('user/systemUserDel', dataJson);
			resolve(res);
		} catch (error) {
			console.log(error);
		}
	});
};
/* 根据登录用户查询当前登录人 */
export const userLoginDetailService = data => {
	return new Promise(async resolve => {
		try {
			const dataJson = {
				...data
			};
			const res = await hpostRequest('user/listUserAll', dataJson);
			resolve(res);
		} catch (error) {
			console.log(error);
		}
	});
};
/* 修改登录用户基本信息 */
export const userEditLoginInfoService = data => {
	return new Promise(async resolve => {
		try {
			const dataJson = {
				...data
			};
			const res = await hpostRequest('user/loginInfo', dataJson);
			resolve(res);
		} catch (error) {
			console.log(error);
		}
	});
};
/* 修改登录用户头像 */
export const userEditAvatarService = data => {
	return new Promise(async resolve => {
		try {
			const dataJson = {
				uid: '',
				avatar: '',
				...data
			};
			const res = await hpostRequest('user/avatar', dataJson);
			resolve(res);
		} catch (error) {
			console.log(error);
		}
	});
};
/* 用户详情 */
export const userDetailService = data => {
	return new Promise(async resolve => {
		try {
			const dataJson = {
				id: '',
				...data
			};
			const res = await hgetRequest('user/systemUserByIdQuery', dataJson);
			resolve(res);
		} catch (error) {
			console.log(error);
		}
	});
};
/* 用户菜单权限 */
export const userMenuAuthorizeService = data => {
	return new Promise(async resolve => {
		try {
			const dataJson = {
				...data
			};
			const res = await hgetRequest('user/systemUserByIdJurisdictionQuery', dataJson);
			resolve(res);
		} catch (error) {
			console.log(error);
		}
	});
};
/* 修改用户密码 */
export const userPasswordEditService = data => {
	return new Promise(async resolve => {
		try {
			const dataJson = {
				id: '',
				userPwdNew: '',
				userPwdOld: '',
				...data
			};
			const res = await hpostRequest('user/systemUserPassUpdate', dataJson);
			resolve(res);
		} catch (error) {
			console.log(error);
		}
	});
};

export default userListService;
