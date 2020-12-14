import { hgetRequest, hpostRequest } from '../../util/htools.axios';

/*
 *@Description: 角色列表
 *@MethodAuthor:  myw
 *@Date: 2020-12-04 11:36:01
 */
export const roleListService = data => {
	return new Promise(async resolve => {
		try {
			const dataJson = {
				pageNum: 0,
				pageSize: 0,
				roleName: '',
				...data
			};
			const res = await hpostRequest('hrole/role/roleAllQuery', dataJson);
			resolve(res);
		} catch (error) {
			console.log(error);
			/* reject(error); */
		}
	});
};
/*
 *@Description: 角色添加
 *@MethodAuthor:  myw
 *@Date: 2020-12-04 11:36:10
 */
export const roleAddService = data => {
	return new Promise(async resolve => {
		try {
			const dataJson = {
				roleName: '',
				state: 0,
				des: '',
				...data
			};
			const res = await hpostRequest('hrole/role/roleAdd', dataJson);
			resolve(res);
		} catch (error) {
			console.log(error);
			/* reject(error); */
		}
	});
};
/*
 *@Description: 角色编辑
 *@MethodAuthor:  myw
 *@Date: 2020-12-04 14:01:46
 */
export const roleEditService = data => {
	return new Promise(async resolve => {
		try {
			const dataJson = {
				roleName: '',
				state: 0,
				des: '',
				...data
			};
			const res = await hpostRequest('hrole/role/roleUpdate', dataJson);
			resolve(res);
		} catch (error) {
			console.log(error);
			/* reject(error); */
		}
	});
};
/*
 *@Description: 角色删除
 *@MethodAuthor:  myw
 *@Date: 2020-12-04 14:40:48
 */
export const roleDeleteService = data => {
	return new Promise(async resolve => {
		try {
			const dataJson = {
				ids: [],
				...data
			};
			const res = await hpostRequest('hrole/role/roleDel', dataJson);
			resolve(res);
		} catch (error) {
			console.log(error);
			/* reject(error); */
		}
	});
};
/*
 *@Description: 角色赋权限
 *@MethodAuthor:  myw
 *@Date: 2020-12-09 14:49:46
 */
export const roleAuthorizeService = data => {
	return new Promise(async resolve => {
		try {
			const dataJson = {
				roleId: '',
				powers: [],
				...data
			};
			const res = await hpostRequest('hrole/role/roleConfigure', dataJson);
			resolve(res);
		} catch (error) {
			console.log(error);
		}
	});
};
/*
 *@Description: 角色详情
 *@MethodAuthor:  myw
 *@Date: 2020-12-11 09:17:20
 */
export const roleDetailService = data => {
	return new Promise(async resolve => {
		try {
			const dataJson = {
				roleId: '',
				...data
			};
			const res = await hgetRequest('hrole/role/roleByIdQuery', dataJson);
			resolve(res);
		} catch (error) {
			console.log(error);
		}
	});
};

export default roleListService;
