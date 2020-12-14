import { hgetRequest, hpostRequest } from '../../util/htools.axios';
import { changeTreeDataToChildren } from '../../util/htools.tree';

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
			const res = await hgetRequest('hmenu/menu/menuAllQuery', dataJson);
			resolve(changeTreeDataToChildren(res));
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
			const res = await hpostRequest('hmenu/menu/menuAdd', dataJson);
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
			const res = await hpostRequest('hmenu/menu/menuInfoUpdate', dataJson);
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
				menuList: [],
				...data
			};
			const res = await hpostRequest('hmenu/menu/menuDel', dataJson);
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
				menuJurisdictions: [],
				...data
			};
			const res = await hpostRequest('hmenu/menu/menuJurisdictionsConfigure', dataJson);
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
				menuId: '',
				...data
			};
			const res = await hgetRequest('hmenu/menu/menuByIdQuery', dataJson);
			resolve(res);
		} catch (error) {
			console.log(error);
		}
	});
};

export default menuListService;
