import { hpostRequest } from '../util/htools.axios';
import { hremoveStorage, hsetStorage } from '../util/htools.web';

export const loginService = data => {
	return new Promise(async (resolve, reject) => {
		const dataJson = {
			userPwd: '',
			userName: '',
			...data
		};
		try {
			const res = await hpostRequest('systemUser/login', dataJson);
			hsetStorage('token', res);
			resolve(res);
		} catch (error) {
			reject(error);
		}
	});
};

export const loginOutService = () => {
	hremoveStorage('token');
};

export default loginService;
