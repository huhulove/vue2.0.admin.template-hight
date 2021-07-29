import Mock from 'mockjs';

const authorizeStatusArr = [0, 1];
const authorizeData = [
	{
		name: '公司删除',
		code: 'company:remove',
		parentId: 'company:list'
	},
	{
		name: '公司编辑',
		code: 'company:update',
		parentId: 'company:list'
	},
	{
		name: '公司新增',
		code: 'company:add',
		parentId: 'company:list'
	},
	{
		name: '公司查看',
		code: 'company:list',
		parentId: ''
	},
	{
		name: '菜单添加',
		code: 'menu:add',
		parentId: 'menu:list'
	},
	{
		name: '菜单查看',
		code: 'menu:list',
		parentId: '0'
	},
	{
		name: '菜单权限配置',
		code: 'menu:authorize',
		parentId: 'menu:list'
	},
	{
		name: '菜单删除',
		code: 'menu:remove',
		parentId: 'menu:list'
	},
	{
		name: '菜单编辑',
		code: 'menu:update',
		parentId: 'menu:list'
	},
	{
		name: '权限添加',
		code: 'authorize:add',
		parentId: 'authorize:list'
	},
	{
		name: '权限编辑',
		code: 'authorize:edit',
		parentId: 'authorize:list'
	},
	{
		name: '权限查看',
		code: 'authorize:list',
		parentId: '0'
	},
	{
		name: '权限删除',
		code: 'authorize:remove',
		parentId: 'authorize:list'
	},
	{
		name: '权限修改',
		code: 'authorize:update',
		parentId: 'authorize:list'
	},
	{
		name: '角色添加',
		code: 'role:add',
		parentId: 'role:list'
	},
	{
		name: '角色查看',
		code: 'role:list',
		parentId: '0'
	},
	{
		name: '角色删除',
		code: 'role:remove',
		parentId: 'role:list'
	},
	{
		name: '角色权限配置',
		code: 'role:authorize',
		parentId: 'role:list'
	},
	{
		name: '角色编辑',
		code: 'role:update',
		parentId: 'role:list'
	},
	{
		name: '用户添加',
		code: 'user:add',
		parentId: 'user:list'
	},
	{
		name: '用户查看',
		code: 'user:list',
		parentId: '0'
	},
	{
		name: '用户删除',
		code: 'user:remove',
		parentId: 'user:list'
	},
	{
		name: '用户编辑',
		code: 'user:update',
		parentId: 'user:list'
	},
	{
		name: '用户角色绑定',
		code: 'user:UserRoleBind',
		parentId: 'user:list'
	},
	{
		name: '用户设置密码',
		code: 'user:secret',
		parentId: 'user:list'
	},
	{
		name: '部门查看',
		code: 'department:list',
		parentId: ''
	},
	{
		name: '部门添加',
		code: 'department:add',
		parentId: 'department:list'
	},
	{
		name: '部门编辑',
		code: 'department:update',
		parentId: 'department:list'
	},
	{
		name: '部门删除',
		code: 'department:remove',
		parentId: 'department:list'
	}
];
authorizeData.forEach(item => {
	item.remark = Mock.Random.title();
	item.createDate = Mock.Random.datetime();
	item.status = Mock.mock({
		'status|1': authorizeStatusArr
	}).status;
	item.sort = Mock.Random.natural(1, 100);
});

export default authorizeData;
