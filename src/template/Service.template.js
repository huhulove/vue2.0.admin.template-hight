import { hpostRequest, hgetRequest } from '@u/htools.axios.js';

/*
 *@Description: 列表
 *@ClassAuthor: myw
 *@Date: 2021-05-19 14:29:57
*/
export const listService = data => {
	return new Promise(async resolve => {
		try {
			const dataJson = {
				pageNum: 1,
				pageSize: 10,
				equipment: '',
				...data
			};
			const res = await hpostRequest('hbase/equipment/equipmentAllQuery', dataJson);
			resolve(res);
		} catch (error) {
			console.log(error);
		}
	});
};
/*
 *@Description: 添加
 *@ClassAuthor: myw
 *@Date: 2021-05-19 14:29:51
*/
export const addService = data => {
	return new Promise(async resolve => {
		try {
			const dataJson = {
				electricityAfter: 0,
				electricityFront: 0,
				energy: '',
				equipment: '',
				codeId: '', // 设备类型
				processId: '', // 生产工艺
				isDel: 0,
				...data
			};
			const res = await hpostRequest('hbase/equipment/equipmentAdd', dataJson);
			resolve(res);
		} catch (error) {
			console.log(error);
		}
	});
};
/*
 *@Description: 编辑
 *@ClassAuthor: myw
 *@Date: 2021-05-19 14:29:44
*/
export const editService = data => {
	return new Promise(async resolve => {
		try {
			const dataJson = {
				id: '',
				consumptionNatural: 0,
				electricityAfter: 0,
				electricityFront: 0,
				energy: '',
				equipment: '',
				naturalAfter: '',
				naturalFront: '',
				powerConsumption: '',
				isDel: 0,
				...data
			};
			const res = await hpostRequest('hbase/equipment/equipmentInfoUpdate', dataJson);
			resolve(res);
		} catch (error) {
			console.log(error);
		}
	});
};
/*
 *@Description: 详情
 *@ClassAuthor: myw
 *@Date: 2021-05-19 14:29:37
*/
export const detailService = data => {
	return new Promise(async resolve => {
		try {
			const dataJson = {
				equipmentId: '',
				...data
			};
			const res = await hgetRequest('hbase/equipment/equipmentByIdQuery', dataJson);
			resolve(res);
		} catch (error) {
			console.log(error);
		}
	});
};
/*
 *@Description: 删除
 *@ClassAuthor: myw
 *@Date: 2021-05-19 14:29:30
*/
export const deleteService = data => {
	return new Promise(async resolve => {
		try {
			const dataJson = {
				equipmentId: [],
				...data
			};
			const res = await hpostRequest('hbase/equipment/equipmentDel', dataJson);
			resolve(res);
		} catch (error) {
			console.log(error);
		}
	});
};

export default ListService;
