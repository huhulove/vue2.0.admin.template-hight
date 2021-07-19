import Mock from 'mockjs';

// eslint-disable-next-line import/no-mutable-exports
const menuData = [
	{
		menuName: '系统管理',
		id: 1,
		pid: 0,
		url: '',
		routeName: '',
		powers: ['role:add', 'role:list', 'user:add', 'user:download', 'user:remove', 'user:select', 'user:update', 'user:UserRoleBind']
	},
	{
		menuName: '菜单管理123',
		id: 2,
		pid: 1,
		url: '/system/menuManager',
		routeName: 'MenuManager',
		powers: ['menu:add', 'menu:list', 'menu:menuJurisdictionsConfigure', 'menu:remove', 'menu:update']
	},
	{
		menuName: '权限管理',
		id: 3,
		pid: 1,
		url: '/system/authorizeManager',
		routeName: 'AuthorizeManager',
		powers: ['power:add', 'power:edit', 'power:list', 'power:remove', 'power:update']
	},
	{
		menuName: '用户管理',
		id: 4,
		pid: 1,
		url: '/system/userManager',
		routeName: 'UserManager',
		powers: ['user:add', 'user:download', 'user:list', 'user:remove', 'user:update', 'user:secret']
	},
	{
		menuName: '角色管理',
		id: 5,
		pid: 1,
		url: '/system/roleManager',
		routeName: 'RoleManager',
		powers: ['role:add', 'role:list', 'role:remove', 'role:rolePowerConf', 'role:update']
	},
	{
		menuName: '部门管理',
		id: 6,
		pid: 1,
		url: '/system/department',
		routeName: 'Department',
		powers: ['department:add', 'department:list', 'department:remove', 'department:rolePowerConf', 'department:update']
	},
	{
		menuName: '基础数据',
		id: 7,
		pid: 0,
		url: '',
		routeName: '',
		powers: ['company:add', 'company:list', 'company:remove', 'company:update']
	},
	{
		menuName: '公司管理',
		id: 8,
		pid: 7,
		url: '/company/companyManager',
		routeName: 'CompanyManager',
		powers: ['company:add', 'company:list', 'company:remove', 'company:update']
	}
];
const menuStatusArr = [0, 1];
menuData.forEach(item => {
	item.menuIcon = 'app';
	item.createDate = Mock.Random.datetime();
	item.menuSort = Mock.Random.natural(1, 100);
	item.status = Mock.mock({
		'status|1': menuStatusArr
	}).status;
	item.isShow = 0;
	item.targetProperty = '_self';
	item.btnType = 0;
	item.isDel = 0;
	item.children = null;
});

export default menuData;
