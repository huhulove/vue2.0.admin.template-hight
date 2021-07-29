import Mock from 'mockjs';

import { filterAuthorizeData } from '../action/authorize.action';
// eslint-disable-next-line import/no-cycle
import { filterCompanyData } from '../action/company.action';

const roleNameArr = ['超级管理员'];
const roleStatus = [0, 1];
const roleData = Mock.mock({
	records: [
		{
			id: 1,
			createDate: Mock.Random.datetime(),
			updateDate: null,
			'name|1': roleNameArr,
			'status|1': roleStatus,
			remark: Mock.Random.title(),
			authorizeCodes: filterAuthorizeData(),
			companyId: filterCompanyData()[0].id
		}
	]
});

export default roleData.records;
