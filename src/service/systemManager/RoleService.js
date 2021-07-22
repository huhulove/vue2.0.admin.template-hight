import { hgetRequest, hpostRequest } from '../../util/htools.axios';

/* 角色列表 */
export const roleListService = data => {
	return new Promise(async resolve => {
		try {
			const dataJson = {
				pageIndex: 0,
				pageSize: 0,
				companyId: '',
				name: '',
				...data
			};
			const res = await hpostRequest('role/roleAllQuery', dataJson);
			resolve(res);
		} catch (error) {
			console.log(error);
			/* reject(error); */
		}
	});
};
/*
 *@Description: 查询所有不属于任何企业的角色
 *@ClassAuthor: Happy ZXM
 *@Date: 2021-01-22 11:12:17
 */
export const roleAdminListService = data => {
	return new Promise(async resolve => {
		try {
			const dataJson = {
				...data
			};
			const res = await hpostRequest('hbtyong/role/roleByAllQuery', dataJson);
			
			resolve(res);
		} catch (error) {
			console.log(error);
			/* reject(error); */
		}
	});
};
/* 角色添加 */
export const roleAddService = data => {
	return new Promise(async resolve => {
		try {
			const dataJson = {
				...data
			};
			const res = await hpostRequest('role/roleAdd', dataJson);
			resolve(res);
		} catch (error) {
			console.log(error);
			/* reject(error); */
		}
	});
};
/* 角色编辑 */
export const roleEditService = data => {
	return new Promise(async resolve => {
		try {
			const dataJson = {
				roleName: '',
				state: 0,
				des: '',
				...data
			};
			if (dataJson.organizationId === 0) {
				dataJson.organizationId = null;
			} else {
				dataJson.organizationId = data.organizationId;
			}
			const res = await hpostRequest('role/roleUpdate', dataJson);
			resolve(res);
		} catch (error) {
			console.log(error);
			/* reject(error); */
		}
	});
};
/* 角色删除 */
export const roleDeleteService = data => {
	return new Promise(async resolve => {
		try {
			const dataJson = {
				ids: [],
				...data
			};
			const res = await hpostRequest('role/roleDel', dataJson);
			resolve(res);
		} catch (error) {
			console.log(error);
			/* reject(error); */
		}
	});
};
/* 角色赋权限 */
export const roleAuthorizeService = data => {
	return new Promise(async resolve => {
		try {
			const dataJson = {
				id: '',
				powerCodes: [],
				...data
			};
			const res = await hpostRequest('role/roleConfigure', dataJson);
			resolve(res);
		} catch (error) {
			console.log(error);
		}
	});
};
/* 角色详情 */
export const roleDetailService = data => {
	return new Promise(async resolve => {
		try {
			const dataJson = {
				id: '',
				...data
			};
			const res = await hgetRequest('role/roleByIdQuery', dataJson);
			resolve(res);
		} catch (error) {
			console.log(error);
		}
	});
};

export default roleListService;
