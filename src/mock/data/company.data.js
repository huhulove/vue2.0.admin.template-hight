import Mock from 'mockjs';

const companyNameArr = ['这是一家牛逼公司', '很夸张公司娱乐传媒有限公司', '还不错科技有限公司', '一家很大很大科技有限公司', '你很行科技有限公司', '杭州乐读科技有限公司'];
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

export default companyData.records;
