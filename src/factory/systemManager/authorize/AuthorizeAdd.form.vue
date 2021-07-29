<template>
	<DataForm :model_p="formData" :rules_p="formRules" @cancel="formCancel" @submit="formSubmit">
		<el-form-item label="名称" prop="name">
			<Input v-model="formData.name" placeholder="请输入权限名称" />
		</el-form-item>
		<el-form-item label="标识" prop="code">
			<Input v-model="formData.code" :disabled="editId !== -1" placeholder="请输入权限标识" />
		</el-form-item>
		<el-form-item label="排序" prop="sort">
			<Input v-model="formData.sort" type="number" placeholder="请输入排序" />
		</el-form-item>
		<el-form-item label="状态" prop="status">
			<RadioGroup v-model="formData.status" :data_p="statusData"></RadioGroup>
		</el-form-item>
		<el-form-item label="父级">
			<SelectTree v-model="formData.parentId" node-key="code" :data="authorizeData" placeholder="请选择父级"></SelectTree>
		</el-form-item>
		<el-form-item label="备注">
			<Input type_p="textarea" :rows_p="4" v-model="formData.remark" placeholder="请输入备注" />
		</el-form-item>
	</DataForm>
</template>

<script>
import { deleteTreeNodeById } from '@u/htools.tree';
import { hpositiveIntegerValid } from '@u/htools.validator';

import SelectTree from '@c/ui/SelectTree';
import RadioGroup from '@c/ui/RadioGroup';
import Input from '@c/ui/Input';
import DataForm from '@c/ui/DataForm';

import { authorizeAddService, authorizeEditService, authorizeListService } from '@s/systemManager/AuthorizeService';

export default {
	props: ['selectData_p'],
	components: {
		SelectTree,
		RadioGroup,
		DataForm,
		Input
	},
	data() {
		return {
			editId: -1,
			statusData: [
				{ label: '正常', value: 0 },
				{ label: '禁用', value: 1 }
			],
			formData: {
				name: '',
				code: '',
				sort: '',
				status: 0,
				parentId: 0,
				remark: ''
			},
			formRules: {
				name: [
					{
						required: true,
						message: '请输入权限名称',
						trigger: 'blur'
					}
				],
				code: [
					{
						required: true,
						message: '请输入权限标识',
						trigger: 'blur'
					}
				],
				sort: [
					{
						validator: hpositiveIntegerValid,
						trigger: 'blur'
					}
				],
				status: [
					{
						required: true,
						message: '请选择权限状态',
						trigger: 'change'
					}
				],
				parentId: [
					{
						required: true,
						message: '请选择权限父级',
						trigger: 'blur'
					}
				]
			},
			defaultProps: {
				children: 'children',
				label: 'name'
			},
			parentName: '',
			authorizeData: null
		};
	},
	watch: {
		selectData_p: {
			async handler(newValue) {
				this.authorizeData === null && (await this.authorizeList());
				if (newValue.length > 0) {
					this.editId = newValue[0].code;
					const optionsTemp = deleteTreeNodeById(this.authorizeData, this.editId, 'code');
					this.authorizeData = [...optionsTemp];
					this.formData = { ...newValue[0] };
				}
			},
			deep: true,
			immediate: true
		}
	},
	methods: {
		async authorizeList() {
			const dataJson = {};
			const res = await authorizeListService(dataJson);
			this.authorizeData = res;
		},
		async formSubmit(valid) {
			if (valid) {
				if (this.editId === -1) {
					await authorizeAddService(this.formData);
				} else {
					const dataJson = {
						...this.formData
					};
					await authorizeEditService(dataJson);
				}
				this.$emit('update:isRefreshList_p', true);
				this.formCancel();
			} else {
				this.$emit('update:isRefreshList_p', false);
			}
		},
		formCancel() {
			this.$emit('update:isShowAEDialog_p', false);
		},
		nodeClickHandler(data) {
			this.formData.parentId = data.code;
			this.parentName = data.name;
		}
	}
};
</script>

<style>
</style>
