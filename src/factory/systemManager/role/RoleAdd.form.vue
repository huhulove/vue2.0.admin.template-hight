<template>
	<DataForm :model_p="formData" :rules_p="formRules" @cancel="formCancel" @submit="formSubmit">
		<el-form-item label="名称" prop="name">
			<Input v-model="formData.name" placeholder="请输入角色名称" />
		</el-form-item>
		<el-form-item label="状态">
			<RadioGroup v-model="formData.status" :data_p="statusData"></RadioGroup>
		</el-form-item>
		<el-form-item label="描述">
			<Input type_p="textarea" :rows_p="4" v-model="formData.remark" placeholder="请输入角色描述" />
		</el-form-item>
	</DataForm>
</template>

<script>
import { hgetStorage } from '@u/htools.web';

import RadioGroup from '@c/ui/RadioGroup';
import Input from '@c/ui/Input';
import DataForm from '@c/ui/DataForm';

import { roleAddService, roleEditService } from '@s/systemManager/RoleService';

export default {
	props: ['selectData_p'],
	components: {
		RadioGroup,
		DataForm,
		Input
	},
	data() {
		return {
			editId: -1,
			formData: {
				name: '',
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
				]
			},
			statusData: [
				{ label: '正常', value: 0 },
				{ label: '禁用', value: 1 }
			],
			isSupperAdmin: false
		};
	},
	watch: {
		selectData_p: {
			async handler(newValue) {
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
		if (hgetStorage('roleIds').indexOf(1) > -1) {
			this.isSupperAdmin = true;
		}
	},
	methods: {
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
