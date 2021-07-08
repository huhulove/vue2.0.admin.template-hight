/*
 *@Description: 项目中使用的工具方法
 *@ClassAuthor: myw
 *@Date: 2020-12-08 14:02:35
 */
import routes from '@/router/routes.js';
import { hgetStorage } from '@u/htools.web';
import { getTreeNodeById } from '@u/htools.tree';
/*
 *@Description: 前端路由表和后台返回菜单数据合并出最终的路由信息
 *@MethodAuthor:  myw
 *@Date: 2020-12-08 14:04:00
 */
const nodeAddField = (data, field, value) => {
	if (data.length > 0) {
		for (let i = 0; i < data.length; i++) {
			const item = data[i];
			let flag = true;
			// 判断条件
			if (item.routeName && item.routeName === value.name) {
				if (!value.meta) {
					value.meta = {};
				}
				value.meta.title = item.menuName;
				item[field] = value;
				flag = false;
			}
			if (flag && item.children) {
				nodeAddField(item.children, 'frontendRoute', value);
			}
		}
	}
};
export const mergeRoutes = data => {
	const menuRoutes = routes.filter(item => {
		return item.name === 'Layout';
	})[0].children;
	menuRoutes.forEach(route => {
		nodeAddField(data, 'frontendRoute', route);
	});
	return data;
};
/* 指定权限可编辑 */
export const changePowerToEdit = targetPowers => {
	const currentUserPowers = hgetStorage('powers');
	console.log(currentUserPowers);
	currentUserPowers.forEach(item => {
		console.log(item);
		getTreeNodeById(targetPowers, 'powerCode', item, node => {
			console.log(node);
			node.disabled = false;
		});
	});
};

export default mergeRoutes;
