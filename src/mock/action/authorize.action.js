import Mock from 'mockjs';

import { hgetAllParams } from '../../util/htools.web';
import authorizeData from '../data/authorize.data';

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
	authorizeData.forEach((item, index) => {
		if (powerCode.indexOf(item.powerCode) !== -1 && powerCode.indexOf(item.parentId) !== -1) {
			authorizeData.splice(index, 1);
		}
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
/* 过滤权限数据 */
export const filterAuthorizeData = () => {
	return authorizeData.map(item => {
		return item.powerCode;
	});
};
