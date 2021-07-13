import Mock from 'mockjs';
import { hgetAllParams, hgetStorage } from '../../util/htools.web';
/* 引用数据 */
// eslint-disable-next-line import/no-cycle
import { userDataRef } from './user.data';
// eslint-disable-next-line import/no-cycle
import { companyDataRef } from './company.data';

let departmentData = [
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
let userData = [];
const fileterUserData = () => {
	userData = userDataRef.map(item => {
		return {
			id: item.id,
			name: item.nickName
		};
	});
};
let companyData = [];
const filterCompanyData = () => {
	companyData = companyDataRef.map(item => {
		return {
			id: item.id,
			name: item.name
		};
	});
};
departmentData.forEach(item => {
	item.createDate = Mock.Random.datetime();
	item.updateDate = null;
	item.companyId = 0;
});
/* 部门列表 */
export const departmentListService = options => {
	const { name, pageIndex, pageSize } = JSON.parse(options.body);
	const companyId = hgetStorage('companyId');
	let companyDepartments = departmentData;
	if (companyId !== 0) {
		companyDepartments = departmentData.filter(item => {
			return item.companyId === companyId;
		});
	}
	const searchResult = companyDepartments.filter(item => {
		return item.name.indexOf(name) > -1;
	});
	searchResult.sort((a, b) => {
		return b.id - a.id;
	});
	const records = [];
	searchResult.forEach((item, index) => {
		if (index >= (pageIndex - 1) * pageSize && index <= pageIndex * pageSize - 1) {
			records.push({ ...item });
		}
	});
	fileterUserData();
	records.forEach(item => {
		if (!item.dutyPeopleId) {
			item.dutyPeople = {};
		} else {
			userData.forEach(user => {
				if (item.dutyPeopleId === user.id) {
					item.dutyPeople = { ...user };
				}
			});
		}
		delete item.dutyPeopleId;
	});
	filterCompanyData();
	records.forEach(department => {
		companyData.forEach(company => {
			if (company.id === department.companyId) {
				department.company = { ...company };
				delete department.companyId;
			}
		});
	});
	return Mock.mock({
		code: 200,
		msg: '操作成功',
		result: {
			current: pageIndex,
			pages: Math.ceil(searchResult.length / pageSize),
			records: records,
			size: pageSize,
			total: searchResult.length
		}
	});
};
/* 部门添加 */
export const departmentAddService = options => {
	const body = JSON.parse(options.body);
	body.createDate = Mock.Random.now();
	body.id = departmentData[departmentData.length - 1].id + 1;
	body.companyId = hgetStorage('companyId');
	departmentData.push(body);
	return Mock.mock({
		code: 200,
		msg: '操作成功',
		result: body.id
	});
};
/* 部门修改 */
export const departmentEditService = options => {
	const body = JSON.parse(options.body);
	body.updateDate = Mock.Random.now();
	departmentData.forEach((item, index) => {
		if (item.id === body.id) {
			departmentData[index] = body;
		}
	});
	return Mock.mock({
		code: 200,
		msg: '操作成功',
		result: body.id
	});
};
/* 部门详情 */
export const departmentDetailService = options => {
	const { id } = hgetAllParams(options.url);
	const result = {
		...departmentData.filter(item => {
			return item.id === Number(id);
		})[0]
	};
	return Mock.mock({
		code: 200,
		msg: '操作成功',
		result: result
	});
};
/* 部门删除 */
export const deleteList = ids => {
	departmentData = departmentData.filter(item => {
		return ids.indexOf(item.id) === -1;
	});
	const newIds = [];
	departmentData.forEach(item => {
		if (ids.indexOf(item.parentId) > -1) {
			newIds.push(item.id);
		}
	});
	if (newIds.length !== 0) {
		deleteList(newIds);
	}
};
export const departmentDeleteService = options => {
	const { ids } = JSON.parse(options.body);
	deleteList(ids);
	return Mock.mock({
		code: 200,
		msg: '操作成功',
		result: ids
	});
};
export const departmentDataRef = departmentData;
export default departmentListService;
