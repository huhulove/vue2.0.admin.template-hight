import Mock from 'mockjs';

import { hgetAllParams } from '../../util/htools.web';
import authorizeData from '../data/authorize.data';

/* 权限列表 */
export const authorizeListService = options => {
	const { name } = hgetAllParams(options.url);
	const searchResult = authorizeData.filter(item => {
		return item.name.indexOf(name) > -1;
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
		return item.code === body.code;
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
		result: body.code
	});
};
/* 权限修改 */
export const authorizeEditService = options => {
	const body = JSON.parse(options.body);
	body.updateDate = Mock.Random.now();
	authorizeData.forEach((item, index) => {
		if (item.code === body.code) {
			authorizeData[index] = body;
		}
	});
	return Mock.mock({
		code: 200,
		msg: '操作成功',
		result: body.code
	});
};
/* 权限删除 */
export const deleteList = ids => {
	for (let i = 0; i < authorizeData.length; i++) {
		const item = authorizeData[i];
		if (ids.indexOf(item.code) > -1) {
			authorizeData.splice(i, 1);
			i--;
		}
	}
	const newIds = [];
	authorizeData.forEach(item => {
		if (ids.indexOf(item.parentId) > -1) {
			newIds.push(item.code);
		}
	});
	if (newIds.length !== 0) {
		deleteList(newIds);
	}
};
export const authorizeDeleteService = options => {
	const { code } = JSON.parse(options.body);
	deleteList(code);
	return Mock.mock({
		code: 200,
		msg: '操作成功',
		result: code
	});
};
/* 权限详情 */
export const authorizeDetailService = options => {
	const { code } = hgetAllParams(options.url);
	const result = authorizeData.filter(item => {
		return item.code === code;
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
		return item.code;
	});
};
