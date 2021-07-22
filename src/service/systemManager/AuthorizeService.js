import { hgetRequest, hpostRequest } from '@u/htools.axios';
import { changeTreeDataToChildren, addTreeKey } from '@u/htools.tree';

/* 权限列表 */
export const authorizeListService = data => {
	return new Promise(async resolve => {
		try {
			const dataJson = {
				name: '',
				...data
			};
			const res = await hgetRequest('jurisdiction/jurisdictionAllQuery', dataJson);
			const resTreeTemp = changeTreeDataToChildren(res);
			const resTree = addTreeKey(resTreeTemp, 0, { value: 'powerCode', label: 'powerName' });
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
				powerCode: '', // 权限标识
				powerName: '', // 权限名称
				remark: '',
				state: '',
				parentId: '', // 权限父级
				powerSort: '', // 权限排序
				...data
			};
			const res = await hpostRequest('jurisdiction/jurisdictionAdd', dataJson);
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
				powerCode: '', // 权限标识
				powerName: '', // 权限名称
				remark: '',
				state: '',
				parentId: '', // 权限父级
				powerSort: '', // 权限排序
				...data
			};
			const res = await hpostRequest('jurisdiction/jurisdictionUpdate', dataJson);
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
				powerCode: [],
				...data
			};
			const res = await hpostRequest('jurisdiction/jurisdictionDel', dataJson);
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
				powerCode: '',
				...data
			};
			const res = await hgetRequest('jurisdiction/jurisdictionByIdQuery', dataJson);
			resolve(res);
		} catch (error) {
			console.log(error);
		}
	});
};

export default authorizeListService;
