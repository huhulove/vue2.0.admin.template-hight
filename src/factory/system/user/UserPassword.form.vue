<template>
	<el-form ref="secretForm" label-position="right" label-width="80px" :model="secretForm" :rules="secretRules">
		<el-form-item label="旧密码" prop="userPwdOld">
			<el-input type="password" v-model="secretForm.userPwdOld"></el-input>
		</el-form-item>
		<el-form-item label="新密码" prop="userPwdNew">
			<el-input type="password" v-model="secretForm.userPwdNew"></el-input>
		</el-form-item>
		<el-form-item>
			<div style="text-align: right">
				<span class="dialog-footer">
					<el-button @click="secretFormCancel">取 消</el-button>
					<el-button type="primary" @click="secretFormSubmit">确 定</el-button>
				</span>
			</div>
		</el-form-item>
	</el-form>
</template>

<script>
import { userPasswordEditService } from '@s/system/UserService';

export default {
	props: ['editId_p'],
	data() {
		return {
			secretForm: {
				userPwdOld: '',
				userPwdNew: ''
			},
			secretRules: {
				userPwdOld: [
					{
						required: true,
						message: '请输入旧密码',
						trigger: 'blur'
					}
				],
				userPwdNew: [
					{
						required: true,
						message: '请输入新密码',
						trigger: 'blur'
					}
				]
			}
		};
	},
	methods: {
		async editPassword() {
			const dataJson = {
				userId: this.editId_p,
				userPwdNew: '',
				userPwdOld: '',
				...this.secretForm
			};
			await userPasswordEditService(dataJson);
		},
		secretFormSubmit() {
			this.$refs.secretForm.validate(async valid => {
				if (valid) {
					await this.editPassword();
					this.secretFormCancel();
					this.$emit('update:isRefreshList_p', true);
				} else {
					this.$emit('update:isRefreshList_p', false);
				}
			});
		},
		secretFormCancel() {
			this.$emit('update:isShowPasswordDialog_p', false);
		}
	}
};
</script>

<style>
</style>
