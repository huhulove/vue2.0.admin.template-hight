import { hpostRequest } from '@u/htools.axios.js';
/*
 *@Description: 登录日志
 *@ClassAuthor: Happy ZXM
 *@Date: 2020-12-22 16:57:08
 */
export const loginLogService = data => {
	return new Promise(async resolve => {
		try {
			const dataJson = {
				logEndDate: null, // 日志操作时间
				logStartDate: null, //
				pageNum: '',
				pageSize: '',
				...data
			};
			const res = await hpostRequest('hlog/signinLogInfo/signinLogInfoByConditionQuery', dataJson);
			resolve(res);
		} catch (error) {
			console.log(error);
		}
	});
};

/*
 *@Description: 登录日志详情
 *@ClassAuthor: Happy ZXM
 *@Date: 2021-01-20 10:50:21
 */
export const loginLogDetailService = data => {
	return new Promise(async resolve => {
		try {
			const dataJson = {
				id: '',
				...data
			};
			const res = await hpostRequest(`hlog/signinLogInfo/signinLogInfoByidAllQuery?id=${dataJson.id}`);
			resolve(res);
		} catch (error) {
			console.log(error);
		}
	});
};

/*
 *@Description: 操作日志
 *@ClassAuthor: Happy ZXM
 *@Date: 2021-01-19 16:18:59
 */
export const operateLogService = data => {
	return new Promise(async resolve => {
		try {
			const dataJson = {
				logEndDate: null, // 日志操作时间
				logStartDate: null, //
				pageNum: '',
				pageSize: '',
				...data
			};
			const res = await hpostRequest('hlog/logInfo/logByConditionQuery', dataJson);
			resolve(res);
		} catch (error) {
			console.log(error);
		}
	});
};

/*
 *@Description: 操作日志详情
 *@ClassAuthor: Happy ZXM
 *@Date: 2021-01-20 10:50:21
 */
export const operateLogDetailService = data => {
	return new Promise(async resolve => {
		try {
			const dataJson = {
				id: '',
				...data
			};
			const res = await hpostRequest(`hlog/logInfo/logInfoByidAllQuery?id=${dataJson.id}`);
			resolve(res);
		} catch (error) {
			console.log(error);
		}
	});
};

/*
 *@Description: 错误日志
 *@ClassAuthor: Happy ZXM
 *@Date: 2021-01-19 16:19:20
 */
export const errorLogService = data => {
	return new Promise(async resolve => {
		try {
			const dataJson = {
				logEndDate: null, // 日志操作时间
				logStartDate: null, //
				pageNum: '',
				pageSize: '',
				...data
			};
			const res = await hpostRequest('hlog/errorLogInfo/errorLogInfoByConditionQuery', dataJson);
			resolve(res);
		} catch (error) {
			console.log(error);
		}
	});
};

/*
 *@Description: 错误日志详情
 *@ClassAuthor: Happy ZXM
 *@Date: 2021-01-20 10:50:21
 */
export const errorLogDetailService = data => {
	return new Promise(async resolve => {
		try {
			const dataJson = {
				id: '',
				...data
			};
			const res = await hpostRequest(`hlog/errorLogInfo/errorLogInfoByidAllQuery?id=${dataJson.id}`);
			resolve(res);
		} catch (error) {
			console.log(error);
		}
	});
};

export default loginLogService;
