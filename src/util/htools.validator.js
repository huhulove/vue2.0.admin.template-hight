/*
 *@Description: 验证手机号
 *@MethodAuthor:  myw
 *@Date: 2020-12-16 17:59:10
 */
export const hphoneValid = (rule, value, callback) => {
	const reg = /^(?:(?:\+|00)86)?1\d{10}$/;
	if (value && !reg.test(value)) {
		callback(new Error('请输入正确的手机号码'));
	} else {
		callback();
	}
};
/*
 *@Description: 验证网址
 *@ClassAuthor: myw
 *@Date: 2021-07-26 11:05:06
 */
export const hwebsiteValid = (rule, value, callback) => {
	const reg = /^(((ht|f)tps?):\/\/)?[\w-]+(\.[\w-]+)+([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?$/;
	if (value && !reg.test(value)) {
		callback(new Error('请输入正确的网址'));
	} else {
		callback();
	}
};
/*
 *@Description: 验证邮箱
 *@ClassAuthor: myw
 *@Date: 2021-07-26 11:56:49
 */
export const hemailValid = (rule, value, callback) => {
	const reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	if (value && !reg.test(value)) {
		callback(new Error('请输入正确的邮箱地址'));
	} else {
		callback();
	}
};
/*
 *@Description: 验证正整数
 *@ClassAuthor: myw
 *@Date: 2021-07-26 17:31:03
*/
export const hpositiveIntegerValid = (rule, value, callback) => {
	const reg = /^\d{1,}$/;
	if (value && !reg.test(value)) {
		callback(new Error('请输入正确的数字'));
	} else {
		callback();
	}
};

export default hphoneValid;
