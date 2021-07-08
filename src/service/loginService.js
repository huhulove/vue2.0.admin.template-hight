// eslint-disable-next-line import/no-cycle
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
			const res = await hpostRequest('user/login', dataJson);
			console.log(res);
			hsetStorage('token', res);
			resolve(res);
		} catch (error) {
			reject(error);
		}
	});
};

export const loginOutService = () => {
	hremoveStorage('token');
	hremoveStorage('organization');
};

export default loginService;
