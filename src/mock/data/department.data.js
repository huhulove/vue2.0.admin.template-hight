import Mock from 'mockjs';

const departmentData = [
	{
		id: 1,
		name: '测试部门',
		parentId: 0,
		dutyPeopleId: 1
	},
	{
		id: 2,
		name: '测试一部',
		parentId: 1,
		dutyPeopleId: null
	},
	{
		id: 3,
		name: '技术部',
		parentId: 0,
		dutyPeopleId: 1
	},
	{
		id: 4,
		name: '技术一部',
		parentId: 3,
		dutyPeopleId: null
	}
];

departmentData.forEach(item => {
	item.createDate = Mock.Random.datetime();
	item.updateDate = null;
	item.companyId = 0;
});

export default departmentData;
