import { hgetAllParams } from '../../util/htools.web';
// eslint-disable-next-line import/no-cycle
import { userAddService } from './user.action';
import companyData from '../data/company.data';

/* 公司列表 */
export const companyListService = options => {
	const { name, pageIndex, pageSize } = JSON.parse(options.body);
	const searchResult = companyData.records.filter(item => {
		return item.id !== 0 && item.name.indexOf(name) > -1;
	});
	searchResult.sort((a, b) => {
		return b.id - a.id;
	});
	const records = searchResult.filter((item, index) => {
		return index >= (pageIndex - 1) * pageSize && index <= pageIndex * pageSize - 1;
	});
	return Mock.mock({
		code: 200,
		msg: '操作成功',
		result: {
			records: records,
			total: searchResult.length,
			size: pageSize,
			current: pageIndex,
			pages: Math.ceil(searchResult.length / pageSize)
		}
	});
};
/* 公司添加 */
export const companyAddService = options => {
	const body = JSON.parse(options.body);
	body.id = companyData.records[companyData.records.length - 1].id + 1;
	body.createDate = Mock.Random.now();
	const user = {
		userName: body.userName,
		userPwd: body.password,
		companyId: body.id,
		nickName: '',
		roleIds: [],
		status: 0
	};
	userAddService({ body: JSON.stringify(user) });
	companyData.records.push(body);
	return Mock.mock({
		code: 200,
		msg: '操作成功',
		result: body.id
	});
};
/* 公司修改 */
export const companyEditService = options => {
	const body = JSON.parse(options.body);
	body.updateDate = Mock.Random.now();
	companyData.records.forEach((item, index) => {
		if (item.id === body.id) {
			companyData.records[index] = body;
		}
	});
	return Mock.mock({
		code: 200,
		msg: '操作成功',
		result: body.id
	});
};
/* 公司详情 */
export const companyDetailService = options => {
	const { id } = hgetAllParams(options.url);
	const result = companyData.records.filter(item => {
		return item.id === Number(id);
	})[0];
	return Mock.mock({
		code: 200,
		msg: '操作成功',
		result: { ...result }
	});
};
/* 公司删除 */
export const companyRemoveService = options => {
	const { ids } = JSON.parse(options.body);
	companyData.records = companyData.records.filter(item => {
		return ids.indexOf(item.id) === -1;
	});
	return Mock.mock({
		code: 200,
		msg: '操作成功',
		result: ids
	});
};
/* 过滤公司数据 */
export const filterCompanyData = () => {
	return companyData.map(item => {
		return {
			id: item.id,
			name: item.name
		};
	});
};
