import Mock from 'mockjs';
import { hgetAllParams } from '../../util/htools.web';

const authorizeStatusArr = [0, 1];
let authorizeData = [
	{
		powerName: '公司删除',
		powerCode: 'company:remove',
		parentId: 'company:list'
	},
	{
		powerName: '公司编辑',
		powerCode: 'company:update',
		parentId: 'company:list'
	},
	{
		powerName: '公司新增',
		powerCode: 'company:add',
		parentId: 'company:list'
	},
	{
		powerName: '公司查看',
		powerCode: 'company:list',
		parentId: ''
	},
	{
		powerName: '菜单添加',
		powerCode: 'menu:add',
		parentId: 'menu:list'
	},
	{
		powerName: '菜单查看',
		powerCode: 'menu:list',
		parentId: '0'
	},
	{
		powerName: '菜单权限配置',
		powerCode: 'menu:menuJurisdictionsConfigure',
		parentId: 'menu:list'
	},
	{
		powerName: '菜单删除',
		powerCode: 'menu:remove',
		parentId: 'menu:list'
	},
	{
		powerName: '菜单编辑',
		powerCode: 'menu:update',
		parentId: 'menu:list'
	},
	{
		powerName: '权限添加',
		powerCode: 'power:add',
		parentId: 'power:list'
	},
	{
		powerName: '权限编辑',
		powerCode: 'power:edit',
		parentId: 'power:list'
	},
	{
		powerName: '权限查看',
		powerCode: 'power:list',
		parentId: '0'
	},
	{
		powerName: '权限删除',
		powerCode: 'power:remove',
		parentId: 'power:list'
	},
	{
		powerName: '权限修改',
		powerCode: 'power:update',
		parentId: 'power:list'
	},
	{
		powerName: '角色添加',
		powerCode: 'role:add',
		parentId: 'role:list'
	},
	{
		powerName: '角色查看',
		powerCode: 'role:list',
		parentId: '0'
	},
	{
		powerName: '角色删除',
		powerCode: 'role:remove',
		parentId: 'role:list'
	},
	{
		powerName: '权限分配',
		powerCode: 'role:rolePowerConf',
		parentId: 'role:list'
	},
	{
		powerName: '角色编辑',
		powerCode: 'role:update',
		parentId: 'role:list'
	},
	{
		powerName: '用户添加',
		powerCode: 'user:add',
		parentId: 'user:list'
	},
	{
		powerName: '用户查看',
		powerCode: 'user:list',
		parentId: '0'
	},
	{
		powerName: '用户删除',
		powerCode: 'user:remove',
		parentId: 'user:list'
	},
	{
		powerName: '用户编辑',
		powerCode: 'user:update',
		parentId: 'user:list'
	},
	{
		powerName: '用户角色绑定',
		powerCode: 'user:UserRoleBind',
		parentId: 'user:list'
	},
	{
		powerName: '用户设置密码',
		powerCode: 'user:secret',
		parentId: 'user:list'
	},
	{
		powerName: '部门查看',
		powerCode: 'department:list',
		parentId: ''
	},
	{
		powerName: '部门添加',
		powerCode: 'department:add',
		parentId: 'department:list'
	},
	{
		powerName: '部门编辑',
		powerCode: 'department:update',
		parentId: 'department:list'
	},
	{
		powerName: '部门删除',
		powerCode: 'department:remove',
		parentId: 'department:list'
	}
];
authorizeData.forEach(item => {
	item.remark = Mock.Random.title();
	item.createDate = Mock.Random.datetime();
	item.status = Mock.mock({
		'status|1': authorizeStatusArr
	}).status;
	item.powerSort = Mock.Random.natural(1, 100);
});
/* 权限列表 */
export const authorizeListService = options => {
	const { name } = hgetAllParams(options.url);
	const searchResult = authorizeData.filter(item => {
		return item.powerName.indexOf(name) > -1;
	});
	return Mock.mock({
		code: 200,
		msg: '操作成功',
		result: searchResult
	});
};
/* 权限添加 */
export const authorizeAddService = options => {
	const body = JSON.parse(options.body);
	const result = authorizeData.filter(item => {
		return item.powerCode === body.powerCode;
	});
	if (result.length !== 0) {
		return Mock.mock({
			code: 500,
			msg: '权限标识重复',
			result: ''
		});
	}
	body.createDate = Mock.Random.now();
	authorizeData.push(body);
	return Mock.mock({
		code: 200,
		msg: '操作成功',
		result: body.powerCode
	});
};
/* 权限修改 */
export const authorizeEditService = options => {
	const body = JSON.parse(options.body);
	body.updateDate = Mock.Random.now();
	authorizeData.forEach((item, index) => {
		if (item.powerCode === body.powerCode) {
			authorizeData[index] = body;
		}
	});
	return Mock.mock({
		code: 200,
		msg: '操作成功',
		result: body.powerCode
	});
};
/* 权限删除 */
export const authorizeDeleteService = options => {
	const { powerCode } = JSON.parse(options.body);
	authorizeData = authorizeData.filter(item => {
		return powerCode.indexOf(item.powerCode) === -1 && powerCode.indexOf(item.parentId) === -1;
	});
	return Mock.mock({
		code: 200,
		msg: '操作成功',
		result: powerCode
	});
};
/* 权限详情 */
export const authorizeDetailService = options => {
	const { powerCode } = hgetAllParams(options.url);
	const result = authorizeData.filter(item => {
		return item.powerCode === powerCode;
	})[0];
	return Mock.mock({
		code: 200,
		msg: '操作成功',
		result: { ...result }
	});
};
export const authorizeDataRef = authorizeData;
export default authorizeListService;
