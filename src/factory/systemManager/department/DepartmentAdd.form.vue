<template>
	<DataForm :model_p="formData" :rules_p="formRules" @cancel="formCancel" @submit="formSubmit">
		<el-form-item label="名称" prop="name">
			<Input v-model="formData.name" placeholder="请输入名称" />
		</el-form-item>
		<el-form-item label="父级" prop="parentId">
			<SelectTree v-model="formData.parentId" node-key="id" :data="optionsDept" placeholder="请选择父级"></SelectTree>
		</el-form-item>
		<el-form-item label="负责人姓名" prop="dutyPeopleId">
			<Select v-model="formData.dutyPeopleId" :optionsData_p="optionsPeople" :optionJson_p="{ label: 'nickName', value: 'id' }" placeholder="请选择负责人姓名"></Select>
		</el-form-item>
	</DataForm>
</template>

<script>
import { deleteTreeNodeById } from '@u/htools.tree';

import Select from '@c/ui/Select';
import SelectTree from '@c/ui/SelectTree';
import Input from '@c/ui/Input';
import DataForm from '@c/custom/DataForm';

// eslint-disable-next-line import/named
import { departmentListService, departmentAddService, departmentEditService } from '@s/systemManager/DepartmentService';
import { userListService } from '@s/systemManager/UserService';

export default {
	props: ['selectData_p'],
	components: {
		Select,
		SelectTree,
		DataForm,
		Input
	},
	data() {
		return {
			optionsDept: null,
			optionsPeople: null,
			editId: -1,
			formData: {
				name: null
			},
			formRules: {
				name: [
					{
						required: true,
						message: '请输入名称',
						trigger: 'blur'
					}
				]
			}
		};
	},
	watch: {
		selectData_p: {
			async handler(newValue) {
				this.optionsDept === null && (await this.departmentListDefaultService());
				this.optionsPeople === null && (await this.userListService());
				if (newValue.length > 0) {
					this.editId = newValue[0].id;
					const optionsTemp = deleteTreeNodeById(this.optionsDept, this.editId);
					this.optionsDept = [...optionsTemp];
					this.formData = { ...newValue[0] };
				}
			},
			deep: true,
			immediate: true
		}
	},
	methods: {
		// 查询所有部门列表
		async departmentListDefaultService() {
			const dataJson = {
				pageIndex: 1,
				pageSize: 10000
			};
			const res = await departmentListService(dataJson);
			this.optionsDept = res.records;
		},
		// 查询所有负责人列表
		async userListService() {
			const res = await userListService({
				pageIndex: 1,
				pageSize: 10000
			});
			this.optionsPeople = res.records;
		},
		async formSubmit(valid) {
			if (valid) {
				if (this.editId === -1) {
					await departmentAddService(this.formData);
				} else {
					const dataJson = {
						id: this.editId,
						...this.formData
					};
					await departmentEditService(dataJson);
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
