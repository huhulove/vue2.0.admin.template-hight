import { hgetRequest, hpostRequest } from '../../util/htools.axios';
import { changeTreeDataToChildren, addTreeKey } from '../../util/htools.tree';

/*
 *@Description: 菜单列表
 *@MethodAuthor:  myw
 *@Date: 2020-12-07 14:10:45
 */
export const menuListService = data => {
	return new Promise(async resolve => {
		try {
			const dataJson = {
				...data
			};
			const res = await hgetRequest('menu/menuAllQuery', dataJson);
			const resTreeTemp = changeTreeDataToChildren(res);
			const resTree = addTreeKey(resTreeTemp, 0, { value: 'id', label: 'menuName' });
			resolve(resTree);
		} catch (error) {
			console.log(error);
		}
	});
};
/*
 *@Description: 菜单添加
 *@MethodAuthor:  myw
 *@Date: 2020-12-07 14:49:59
 */
export const menuAddService = data => {
	return new Promise(async resolve => {
		try {
			const dataJson = {
				isShow: 0,
				menuIcon: '',
				menuName: '',
				menuSort: '',
				pid: '',
				state: '',
				url: '',
				...data
			};
			const res = await hpostRequest('menu/menuAdd', dataJson);
			resolve(res);
		} catch (error) {
			console.log(error);
		}
	});
};
/*
 *@Description: 菜单编辑
 *@MethodAuthor:  myw
 *@Date: 2020-12-07 14:54:21
 */
export const menuEditService = data => {
	return new Promise(async resolve => {
		try {
			const dataJson = {
				id: '',
				isShow: 0,
				menuIcon: '',
				menuName: '',
				menuSort: '',
				pid: '',
				state: '',
				url: '',
				...data
			};
			const res = await hpostRequest('menu/menuInfoUpdate', dataJson);
			resolve(res);
		} catch (error) {
			console.log(error);
		}
	});
};
/*
 *@Description: 菜单删除
 *@MethodAuthor:  myw
 *@Date: 2020-12-07 15:59:06
 */
export const menuDeleteService = data => {
	return new Promise(async resolve => {
		try {
			const dataJson = {
				ids: [],
				...data
			};
			const res = await hpostRequest('menu/menuDel', dataJson);
			resolve(res);
		} catch (error) {
			console.log(error);
		}
	});
};
/*
 *@Description: 菜单赋权限
 *@MethodAuthor:  myw
 *@Date: 2020-12-07 16:34:28
 */
export const menuAuthorizeService = data => {
	return new Promise(async resolve => {
		try {
			const dataJson = {
				authorizeCodes: [],
				...data
			};
			const res = await hpostRequest('menu/menuAuthorizeConfigure', dataJson);
			resolve(res);
		} catch (error) {
			console.log(error);
		}
	});
};
/*
 *@Description: 菜单详情
 *@MethodAuthor:  myw
 *@Date: 2020-12-11 09:43:20
 */
export const menuDetailService = data => {
	return new Promise(async resolve => {
		try {
			const dataJson = {
				id: '',
				...data
			};
			const res = await hgetRequest('menu/menuByIdQuery', dataJson);
			resolve(res);
		} catch (error) {
			console.log(error);
		}
	});
};

export default menuListService;
