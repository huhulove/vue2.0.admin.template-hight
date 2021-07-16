import Mock from 'mockjs';
// eslint-disable-next-line import/no-cycle
import { roleDataIds } from '../action/role.action';
// eslint-disable-next-line import/no-cycle
import { filterCompanyData } from '../action/company.action';

const userName = ['admin'];
const userStatus = [0, 1];

const userData = Mock.mock({
	records: [
		{
			id: 1,
			nickName: Mock.Random.cname(),
			createDate: Mock.Random.datetime(),
			updateDate: null,
			userPwd: '123456',
			'userName|1': userName,
			'status|1': userStatus,
			remark: Mock.Random.title(),
			roleIds: roleDataIds(),
			companyId: filterCompanyData()[0].id,
			departmentId: null,
			birthday: null,
			email: null,
			phone: null,
			avatar: null,
			sex: null
		}
	]
});

export default userData.records;
