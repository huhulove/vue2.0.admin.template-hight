import Mock from 'mockjs';
import { hgetAllParams } from '../../util/htools.web';
// eslint-disable-next-line import/no-cycle
import { userAddService } from './user.data';

const companyNameArr = [
	'这是一家牛逼公司',
	'很夸张公司娱乐传媒有限公司',
	'还不错科技有限公司',
	'一家很大很大科技有限公司',
	'你很行科技有限公司',
	'杭州乐读科技有限公司'
];
const companyAddressArr = ['北京市朝阳区人民大学北路123号', '天津市东海湾678号', '广州市不知道街道2号'];
const companyLogoArr = [Mock.Random.image('200x100'), Mock.Random.image('100x50')];
const companyWebsiteArr = [Mock.Random.url(), Mock.Random.url(), Mock.Random.url(), Mock.Random.url(), Mock.Random.url()];
const companyData = Mock.mock({
	'records|1-25': [
		{
			'id|+1': 1,
			'name|1': companyNameArr,
			createDate: Mock.Random.datetime(),
			updateDate: null,
			phone: '@phone',
			'address|1': companyAddressArr,
			'website|1': companyWebsiteArr,
			email: '@EMAIL',
			'logo|1': companyLogoArr,
			'businessLicense|1': companyLogoArr
		}
	]
});
companyData.records.unshift({
	id: 0,
	name: '平台'
});
// 拓展mockjs
Mock.Random.extend({
	// eslint-disable-next-line func-names
	phone: function() {
		const phonePrefixs = ['132', '135', '189', '137', '138', '139'];
		return this.pick(phonePrefixs) + Mock.mock(/\d{8}/);
	}
});

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
export const companyDataRef = companyData.records;
export default companyListService;
