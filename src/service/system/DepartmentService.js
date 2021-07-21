import { hpostRequest, hgetRequest } from '@u/htools.axios.js';
import { changeTreeDataToChildren, addTreeKey } from '@/util/htools.tree';

/* 部门列表 */
export const departmentListService = data => {
	return new Promise(async resolve => {
		try {
			const dataJson = {
				pageIndex: 1,
				pageSize: 10,
				companyId: '',
				name: '',
				...data
			};
			const res = await hpostRequest('department/departmentAllQuery', dataJson);
			const resTreeTemp = changeTreeDataToChildren(res.records);
			const resTree = addTreeKey(resTreeTemp, 0, { value: 'id', label: 'name' });
			res.records = resTree;
			res.pages = Math.ceil(resTree.length / dataJson.pageSize);
			res.total = resTree.length;
			resolve(res);
		} catch (error) {
			console.log(error);
		}
	});
};

/* 部门添加 */
export const departmentAddService = data => {
	return new Promise(async resolve => {
		try {
			const dataJson = {
				...data
			};
			const res = await hpostRequest('department/departmentAdd', dataJson);
			resolve(res);
		} catch (error) {
			console.log(error);
		}
	});
};

/* 部门修改 */
export const departmentEditService = data => {
	return new Promise(async resolve => {
		try {
			const dataJson = {
				id: '',
				...data
			};
			const res = await hpostRequest('department/departmentUpdate', dataJson);
			resolve(res);
		} catch (error) {
			console.log(error);
		}
	});
};

/* 部门删除 */
export const departmentDeleteService = data => {
	return new Promise(async resolve => {
		try {
			const dataJson = {
				ids: [],
				...data
			};
			const res = await hpostRequest('department/departmentDel', dataJson);
			resolve(res);
		} catch (error) {
			console.log(error);
		}
	});
};

/* 部门详情 */
export const departmentDetailService = data => {
	return new Promise(async resolve => {
		try {
			const dataJson = {
				id: '',
				...data
			};
			const res = await hgetRequest('department/departmentByIdQuery', dataJson);
			resolve(res);
		} catch (error) {
			console.log(error);
		}
	});
};

export default departmentListService;
