import Mock from 'mockjs';

export const uploadImgService = () => {
	return Mock.mock({
		code: 200,
		msg: '操作成功',
		result: Mock.Random.image('200x100')
	});
};

export default uploadImgService;
