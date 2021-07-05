import { Message, Loading } from 'element-ui';
import axios from 'axios';
import { hgetStorage, hremoveStorage, huploadConfigJson } from './htools.web';
// eslint-disable-next-line import/no-cycle
import router from '../router/index';

const request = axios.create();

/*
 *@ClassAuthor: huhulove
 *@Email: 2373838484@qq.com
 *@Date: 2020-10-22 17:39:31
 *@Description: axios - 请求拦截器
 */
let envConfig = null;
let loading = null;
request.interceptors.request.use(
	async config => {
		if (!envConfig) {
			envConfig = await huploadConfigJson();
		}
		config.headers = {
			Authorization: hgetStorage('token')
		};
		if (config.url.indexOf('huser/') > -1) {
			config.url = config.url.replace('huser/', envConfig.userUrl);
		} else if (config.url.indexOf('hbtyong/') > -1) {
			config.url = config.url.replace('hbtyong/', envConfig.btyongUrl);
		} else if (config.url.indexOf('hrole/') > -1) {
			config.url = config.url.replace('hrole/', envConfig.roleUrl);
		} else if (config.url.indexOf('hauthorize/') > -1) {
			config.url = config.url.replace('hauthorize/', envConfig.authorizeUrl);
		} else if (config.url.indexOf('hmenu/') > -1) {
			config.url = config.url.replace('hmenu/', envConfig.menuUrl);
		} else if (config.url.indexOf('horder/') > -1) {
			config.url = config.url.replace('horder/', envConfig.orderUrl);
		} else if (config.url.indexOf('hbase/') > -1) {
			config.url = config.url.replace('hbase/', envConfig.baseDataUrl);
		} else if (config.url.indexOf('hdevice:') > -1) {
			config.url = config.url.replace('hdevice:', envConfig.deviveUrl);
		} else if (config.url.indexOf('htax/') > -1) { 
			config.url = config.url.replace('htax/', envConfig.taxUrl);
		} else if (config.url.indexOf('hsta/') > -1) { 
			config.url = config.url.replace('hsta/', envConfig.staUrl);
		} else if (config.url.indexOf('hlog/') > -1) { 
			config.url = config.url.replace('hlog/', envConfig.logUrl);
		} else if (config.url.indexOf('hdeli/') > -1) { 
			config.url = config.url.replace('hdeli/', envConfig.hdeli);
		} else if (config.url.indexOf('hexport/') > -1) { 
			config.url = config.url.replace('hexport/', envConfig.hexport);
		} else {
			config.url = `${envConfig.baseUrl}${config.url}`;
		}
		loading = Loading.service({ lock: true, text: '正在加载...', spinner: 'el-icon-loading', background: 'rgba(0, 0, 0, 0.7)', fullscreen: true });
		return config;
	},
	error => {
		loading.close();
		return Promise.reject(error);
	}
);

/*
 *@ClassAuthor: huhulove
 *@Email: 2373838484@qq.com
 *@Date: 2020-10-22 17:40:54
 *@Description: axios - 响应拦截器
 */
request.interceptors.response.use(
	response => {
		loading.close();
		const { code } = response.data;
		if (code === 401) {
			// 未授权
			router.push({
				path: '/login',
				querry: { redirect: router.currentRoute.fullPath } // 从哪个页面跳转
			});
			hremoveStorage('token');
			return Promise.reject();
		}
		if (code === 500) {
			const { msg } = response.data;
			Message.error(msg);
			return Promise.reject();
		}
		if (code === 1000) {
			Message.error('请检查网络连接');
			return Promise.reject();
		}
		const { msg } = response.data;
		Message.closeAll();
		Message.success(msg);
		return response.data.result;
	},
	error => {
		loading.close();
		Message.error('接口请求报错');
		return Promise.reject(error);
	}
);

/*
 *@ClassAuthor: huhulove
 *@Email: 2373838484@qq.com
 *@Date: 2020-10-22 17:41:14
 *@Description: axios - get 方法
 */
export function hgetRequest(url, params = {}) {
	return new Promise((resolve, reject) => {
		request
			.get(url, {
				params: params
			})
			.then(response => {
				resolve(response);
			})
			.catch(err => {
				reject(err);
			});
	});
}

/*
 *@ClassAuthor: huhulove
 *@Email: 2373838484@qq.com
 *@Date: 2020-10-22 17:45:53
 *@Description: axios - post 方法
 */
export function hpostRequest(url, data = {}) {
	return new Promise((resolve, reject) => {
		request.post(url, data).then(
			response => {
				resolve(response);
			},
			err => {
				reject(err);
			}
		);
	});
}

/*
 *@ClassAuthor: huhulove
 *@Email: 2373838484@qq.com
 *@Date: 2020-10-22 17:46:20
 *@Description: axios - patch 方法
 */
export function hpatchRequest(url, data = {}) {
	return new Promise((resolve, reject) => {
		request.patch(url, data).then(
			response => {
				resolve(response);
			},
			err => {
				reject(err);
			}
		);
	});
}

/*
 *@ClassAuthor: huhulove
 *@Email: 2373838484@qq.com
 *@Date: 2020-10-22 17:46:38
 *@Description: axios - put 方法
 */
export function hputRequest(url, data = {}) {
	return new Promise((resolve, reject) => {
		request.put(url, data).then(
			response => {
				resolve(response);
			},
			err => {
				reject(err);
			}
		);
	});
}
