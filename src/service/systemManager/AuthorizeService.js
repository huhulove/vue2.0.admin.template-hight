import { hgetRequest, hpostRequest } from '@u/htools.axios';
import { changeTreeDataToChildren, addTreeKey } from '@u/htools.tree';
import { hgetStorage } from '@u/htools.web';
import { changeAuthorizeToEdit } from '@u/index';

/* 权限列表 */
export const authorizeListService = data => {
	return new Promise(async resolve => {
		try {
			const dataJson = {
				name: '',
				...data
			};
			const res = await hgetRequest('authorize/authorizeAllQuery', dataJson);
			const resTreeTemp = changeTreeDataToChildren(res);
			let resTree = null;
			if (hgetStorage('roleIds').indexOf(globalConfig.superAdminRoleId) > -1) {
				resTree = addTreeKey(resTreeTemp, 0, { value: 'code', label: 'name' });
			} else {
				resTree = addTreeKey(resTreeTemp, 0, { value: 'code', label: 'name', disabled: true });
				changeAuthorizeToEdit(resTree);
			}
			resolve(resTree);
		} catch (error) {
			console.log(error);
		}
	});
};
/* 权限添加 */
export const authorizeAddService = data => {
	return new Promise(async resolve => {
		try {
			const dataJson = {
				code: '', // 权限标识
				name: '', // 权限名称
				remark: '',
				state: '',
				parentId: '', // 权限父级
				sort: '', // 权限排序
				...data
			};
			const res = await hpostRequest('authorize/authorizeAdd', dataJson);
			resolve(res);
		} catch (error) {
			console.log(error);
		}
	});
};
/* 权限编辑 */
export const authorizeEditService = data => {
	return new Promise(async resolve => {
		try {
			const dataJson = {
				code: '', // 权限标识
				name: '', // 权限名称
				remark: '',
				state: '',
				parentId: '', // 权限父级
				sort: '', // 权限排序
				...data
			};
			const res = await hpostRequest('authorize/authorizeUpdate', dataJson);
			resolve(res);
		} catch (error) {
			console.log(error);
		}
	});
};
/* 权限删除 */
export const authorizeDeleteService = data => {
	return new Promise(async resolve => {
		try {
			const dataJson = {
				code: [],
				...data
			};
			const res = await hpostRequest('authorize/authorizeDel', dataJson);
			resolve(res);
		} catch (error) {
			console.log(error);
		}
	});
};
/* 权限详情 */
export const authorizeDetailService = data => {
	return new Promise(async resolve => {
		try {
			const dataJson = {
				code: '',
				...data
			};
			const res = await hgetRequest('authorize/authorizeByIdQuery', dataJson);
			resolve(res);
		} catch (error) {
			console.log(error);
		}
	});
};

export default authorizeListService;
