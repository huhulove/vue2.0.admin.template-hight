<template>
	<DataForm :model="formData" :rules="formRules" @cancel="formCancel" @submit="formSubmit">
		<el-form-item label="所属企业" prop="companyId">
			<Select v-model="formData.companyId" :optionsData_p="companyData" placeholder="请选择所属企业" :disabled="!isSupperAdmin">
				<el-option label="平台" :value="0"></el-option>
			</Select>
		</el-form-item>
		<el-form-item label="名称" prop="name">
			<Input v-model="formData.name" placeholder="请输入角色名称" />
		</el-form-item>
		<el-form-item label="状态">
			<Radio v-model="formData.status" :data_p="statusData"></Radio>
		</el-form-item>
		<el-form-item label="描述">
			<Input type="textarea" :rows="4" v-model="formData.remark" placeholder="请输入角色描述" />
		</el-form-item>
	</DataForm>
</template>

<script>
import { hgetStorage } from '@u/htools.web';

import Select from '@c/ui/Select';
import Radio from '@c/ui/Radio';
import Input from '@c/ui/Input';
import DataForm from '@c/ui/DataForm';

import { roleAddService, roleEditService } from '@s/system/RoleService';
import { companyListService } from '@s/base/CompanyService';

export default {
	props: ['selectData_p'],
	components: {
		Select,
		Radio,
		DataForm,
		Input
	},
	data() {
		return {
			editId: -1,
			formData: {
				name: '',
				companyId: '',
				status: 0,
				remark: ''
			},
			formRules: {
				name: [
					{
						required: true,
						message: '请输入角色名称',
						trigger: 'blur'
					}
				],
				companyId: [
					{
						required: true,
						message: '请选择企业',
						trigger: 'change'
					}
				]
			},
			statusData: [
				{ label: '正常', value: 0 },
				{ label: '禁用', value: 1 }
			],
			isSupperAdmin: false,
			companyData: null
		};
	},
	watch: {
		selectData_p: {
			async handler(newValue) {
				this.companyData === null && (await this.companyList());
				if (newValue.length > 0) {
					this.editId = newValue[0].id;
					this.formData = { ...newValue[0] };
				}
			},
			deep: true,
			immediate: true
		}
	},
	mounted() {
		const companyId = hgetStorage('companyId');
		this.formData.companyId = companyId;
		if (hgetStorage('roleIds').indexOf(1) > -1) {
			this.isSupperAdmin = true;
		}
	},
	methods: {
		// 获取企业列表
		async companyList() {
			const dataJson = {
				pageNum: 1,
				pageSize: 100000
			};
			const res = await companyListService(dataJson);
			this.companyData = res.records;
		},
		async formSubmit(valid) {
			if (valid) {
				if (this.editId === -1) {
					await roleAddService(this.formData);
				} else {
					const dataJson = {
						id: this.editId,
						...this.formData
					};
					await roleEditService(dataJson);
				}
				this.formCancel();
				this.$emit('update:isRefreshList_p', true);
			} else {
				this.$emit('update:isRefreshList_p', false);
			}
		},
		formCancel() {
			this.$emit('update:isShowAEDialog_p', false);
		}
	}
};
</script>

<style>
</style>
