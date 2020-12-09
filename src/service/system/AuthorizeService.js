import { hgetRequest, hpostRequest } from '../../util/htools.axios';
import { changeTreeDataToChildren } from '../../util/htools.tree';

/*
 *@Description: 权限列表
 *@MethodAuthor:  myw
 *@Date: 2020-12-07 10:37:06
 */
export const authorizeListService = data => {
	return new Promise(async resolve => {
		try {
			const dataJson = {
				...data
			};
			const res = await hgetRequest('hauthorize/jurisdiction/jurisdictionAllQuery', dataJson);
			resolve(changeTreeDataToChildren(res));
		} catch (error) {
			console.log(error);
		}
	});
};
/*
 *@Description: 权限添加
 *@MethodAuthor:  myw
 *@Date: 2020-12-07 10:37:19
 */
export const authorizeAddService = data => {
	return new Promise(async resolve => {
		try {
			const dataJson = {
				powerCode: '',
				powerName: '',
				remark: '',
				state: '',
				parentId: '',
				...data
			};
			const res = await hpostRequest('hauthorize/jurisdiction/jurisdictionAdd', dataJson);
			console.log(res);
			resolve(res);
		} catch (error) {
			console.log(error);
		}
	});
};
/*
 *@Description: 权限编辑
 *@MethodAuthor:  myw
 *@Date: 2020-12-07 10:39:49
 */
export const authorizeEditService = data => {
	return new Promise(async resolve => {
		try {
			const dataJson = {
				id: '',
				powerCode: '',
				powerName: '',
				remark: '',
				state: '',
				parentId: '',
				...data
			};
			const res = await hpostRequest('hauthorize/jurisdiction/jurisdictionUpdate', dataJson);
			resolve(res);
		} catch (error) {
			console.log(error);
		}
	});
};
/*
 *@Description: 权限删除
 *@MethodAuthor:  myw
 *@Date: 2020-12-07 13:22:39
 */
export const authorizeDeleteService = data => {
	return new Promise(async resolve => {
		try {
			const dataJson = {
				menuJurisdictions: [],
				...data
			};
			const res = await hpostRequest('hauthorize/jurisdiction/jurisdictionDel', dataJson);
			resolve(res);
		} catch (error) {
			console.log(error);
		}
	});
};

export default authorizeListService;
