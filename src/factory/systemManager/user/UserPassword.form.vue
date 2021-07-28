<template>
	<DataForm :model_p="formData" :rules_p="formRules" @submit="formSubmit" v-bind="$attrs" v-on="$listeners">
		<el-form-item label="旧密码" prop="userPwdOld">
			<Input type_p="password" v-model="formData.userPwdOld" />
		</el-form-item>
		<el-form-item label="新密码" prop="userPwdNew">
			<Input type_p="password" v-model="formData.userPwdNew" />
		</el-form-item>
		<el-form-item label="确认密码" prop="checkPass">
			<Input type_p="password" v-model="formData.checkPass" />
		</el-form-item>
		<template slot="footer">
			<slot name="footer"></slot>
		</template>
	</DataForm>
</template>

<script>
import DataForm from '@c/ui/DataForm';
import Input from '@c/ui/Input';

import { userPasswordEditService } from '@s/systemManager/UserService';

export default {
	inheritAttrs: false,
	components: {
		DataForm,
		Input
	},
	data() {
		const passwordValid = (rule, value, callback) => {
			if (value === '') {
				callback(new Error('请再次输入密码'));
			} else if (value !== this.formData.userPwdNew) {
				callback(new Error('两次输入密码不一致!'));
			} else {
				callback();
			}
		};
		return {
			formData: {
				userPwdOld: '',
				userPwdNew: '',
				checkPass: ''
			},
			formRules: {
				userPwdOld: [
					{
						required: true,
						message: '请输入旧密码',
						trigger: 'blur'
					},
					{
						min: 6,
						max: 16,
						message: '长度在6到16个字符',
						trigger: 'blur'
					}
				],
				userPwdNew: [
					{
						required: true,
						message: '请输入新密码',
						trigger: 'blur'
					},
					{
						min: 6,
						max: 16,
						message: '长度在6到16个字符',
						trigger: 'blur'
					}
				],
				checkPass: [
					{
						required: true,
						validator: passwordValid,
						trigger: 'blur'
					}
				]
			}
		};
	},
	methods: {
		async formSubmit(valid) {
			if (valid) {
				const dataJson = {
					userPwdNew: '',
					userPwdOld: '',
					...this.formData
				};
				await userPasswordEditService(dataJson);
				this.$emit('submitCallback');
			}
		}
	}
};
</script>

<style>
</style>
