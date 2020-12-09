import { hgetRequest, hpostRequest } from '../../util/htools.axios';

/*
 *@Description: 用户列表
 *@MethodAuthor:  zxh
 *@Date: 2020-12-04 11:36:01
 */
export const userListService = data => {
	return new Promise(async resolve => {
		try {
			const dataJson = {
				...data
			};
			const res = await hpostRequest('huser/systemUser/systemUserAllQuery', dataJson);
			resolve(res);
		} catch (error) {
			console.log(error);
		}
	});
};
/*
 *@Description: 用户添加
 *@MethodAuthor:  zxh
 *@Date: 2020-12-04 11:36:10
 */
export const userAddService = data => {
	return new Promise(async resolve => {
		try {
			const dataJson = {
				...data
			};
			const res = await hpostRequest('huser/systemUser/systemUserAdd', dataJson);
			resolve(res);
		} catch (error) {
			console.log(error);
		}
	});
};
/*
 *@Description: 用户编辑
 *@MethodAuthor:  zxh
 *@Date: 2020-12-04 14:01:46
 */
export const userEditService = data => {
	return new Promise(async resolve => {
		try {
			const dataJson = {
				...data
			};
			const res = await hpostRequest('huser/systemUser/systemUserInfoUpdate', dataJson);
			resolve(res);
		} catch (error) {
			console.log(error);
		}
	});
};
/*
 *@Description: 用户删除
 *@MethodAuthor:  zxh
 *@Date: 2020-12-04 14:40:48
 */
export const userDeleteService = data => {
	return new Promise(async resolve => {
		try {
			const dataJson = {
				...data
			};
			const res = await hpostRequest('huser/systemUser/systemUserDel', dataJson);
			resolve(res);
		} catch (error) {
			console.log(error);
		}
	});
};
/*
 *@Description: 用户详情
 *@MethodAuthor:  myw
 *@Date: 2020-12-08 10:36:27
	框架使用
 */
export const userDetailService = data => {
	return new Promise(async resolve => {
		try {
			const dataJson = {
				...data
			};
			const res = await hgetRequest('huser/systemUser/systemUserByIdQuery', dataJson);
			resolve(res);
		} catch (error) {
			console.log(error);
		}
	});
};
/*
 *@Description: 用户菜单权限
 *@MethodAuthor:  myw
 *@Date: 2020-12-08 11:42:03
 */
export const userMenuAuthorizeService = data => {
	return new Promise(async resolve => {
		try {
			const dataJson = {
				...data
			};
			const res = await hgetRequest('huser/systemUser/systemUserByIdJurisdictionQuery', dataJson);
			resolve(res);
		} catch (error) {
			console.log(error);
		}
	});
};

export default userListService;
