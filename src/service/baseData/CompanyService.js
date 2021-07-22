import { hpostRequest, hgetRequest } from '@u/htools.axios.js';

/* 公司列表 */
export const companyListService = data => {
	return new Promise(async resolve => {
		try {
			const dataJson = {
				pageIndex: 1,
				pageSize: 10,
				name: '',
				...data
			};
			const res = await hpostRequest('equipment/equipmentAllQuery', dataJson);
			resolve(res);
		} catch (error) {
			console.log(error);
		}
	});
};
/* 公司添加 */
export const companyAddService = data => {
	return new Promise(async resolve => {
		try {
			const dataJson = {
				name: '',
				phone: '',
				userName: '',
				email: '',
				password: '',
				website: '',
				address: '',
				logo: '',
				businessLicense: '',
				...data
			};
			const res = await hpostRequest('equipment/equipmentAdd', dataJson);
			resolve(res);
		} catch (error) {
			console.log(error);
		}
	});
};
/* 公司修改 */
export const companyEditService = data => {
	return new Promise(async resolve => {
		try {
			const dataJson = {
				id: '',
				name: '',
				phone: '',
				userName: '',
				email: '',
				password: '',
				website: '',
				address: '',
				logo: '',
				businessLicense: '',
				...data
			};
			const res = await hpostRequest('equipment/equipmentInfoUpdate', dataJson);
			resolve(res);
		} catch (error) {
			console.log(error);
		}
	});
};
/* 公司详情 */
export const companyDetailService = data => {
	return new Promise(async resolve => {
		try {
			const dataJson = {
				id: '',
				...data
			};
			const res = await hgetRequest('equipment/equipmentByIdQuery', dataJson);
			resolve(res);
		} catch (error) {
			console.log(error);
		}
	});
};
/* 公司删除 */
export const companyDeleteService = data => {
	return new Promise(async resolve => {
		try {
			const dataJson = {
				ids: [],
				...data
			};
			const res = await hpostRequest('equipment/equipmentDel', dataJson);
			resolve(res);
		} catch (error) {
			console.log(error);
		}
	});
};

export default companyListService;
