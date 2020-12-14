/*
 *@Description: 项目中使用的工具方法
 *@ClassAuthor: myw
 *@Date: 2020-12-08 14:02:35
 */
import routes from '@/router/routes.js';
/*
 *@Description: 前端路由表和后台返回菜单数据合并出最终的路由信息
 *@MethodAuthor:  myw
 *@Date: 2020-12-08 14:04:00
 */
const nodeAddField = (data, field, value) => {
	if (data.length > 0) {
		for (let i = 0; i < data.length; i++) {
			const item = data[i];
			// 判断条件
			if (item.routeName && item.routeName === value.name) {
				item[field] = value;
				return false;
			}
			if (item.children) {
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

export default mergeRoutes;
