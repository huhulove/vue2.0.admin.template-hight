import { Message, Loading } from 'element-ui';
import axios from 'axios';
import { hgetStorage, hremoveStorage } from './htools.web';
// eslint-disable-next-line import/no-cycle
import router from '../router/index';

const request = axios.create();

/*
 *@ClassAuthor: huhulove
 *@Email: 2373838484@qq.com
 *@Date: 2020-10-22 17:39:31
 *@Description: axios - 请求拦截器
 */
let loading = null;
request.interceptors.request.use(
	async config => {
		config.headers = {
			Authorization: hgetStorage('token')
		};
		config.url = `${globalConfig.baseUrl}${config.url}`;
		loading = Loading.service({
			lock: true,
			text: '正在加载...',
			spinner: 'el-icon-loading',
			background: 'rgba(0, 0, 0, 0.7)',
			fullscreen: true
		});
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
		if (code === 400) {
			const { msg } = response.data;
			Message.error(msg);
			return Promise.reject();
		}
		if (code === 500) {
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
