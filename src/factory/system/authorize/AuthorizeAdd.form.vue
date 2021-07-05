<template>
	<DataForm :model="formData" :rules="formRules" @cancel="formCancel" @submit="formSubmit">
		<el-form-item label="名称" prop="powerName">
			<Input v-model="formData.powerName" placeholder="请输入权限名称" />
		</el-form-item>
		<el-form-item label="标识" prop="powerCode">
			<Input v-model="formData.powerCode" :disabled="editId !== -1" placeholder="请输入权限标识" />
		</el-form-item>
		<el-form-item label="排序" prop="powerSort">
			<Input v-model="formData.powerSort" type="number" placeholder="请输入排序" />
		</el-form-item>
		<el-form-item label="状态" prop="status">
			<Radio v-model="formData.status" :data_p="statusData"></Radio>
		</el-form-item>
		<el-form-item label="父级">
			<SelectTree v-model="formData.parentId" node-key="powerCode" :data="authorizeData" placeholder="请选择父级"></SelectTree>
		</el-form-item>
		<el-form-item label="备注">
			<Input type="textarea" :rows="4" v-model="formData.remark" placeholder="请输入备注" />
		</el-form-item>
	</DataForm>
</template>

<script>
import { deleteTreeNodeById } from '@u/htools.tree';

import SelectTree from '@c/ui/SelectTree';
import Radio from '@c/ui/Radio';
import Input from '@c/ui/Input';
import DataForm from '@c/ui/DataForm';

import { authorizeAddService, authorizeEditService, authorizeListService } from '@s/system/AuthorizeService';

export default {
	props: ['selectData_p'],
	components: {
		SelectTree,
		Radio,
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
				powerName: '',
				powerCode: '',
				powerSort: '',
				status: 0,
				parentId: 0,
				remark: ''
			},
			formRules: {
				powerName: [
					{
						required: true,
						message: '请输入权限名称',
						trigger: 'blur'
					}
				],
				powerCode: [
					{
						required: true,
						message: '请输入权限标识',
						trigger: 'blur'
					}
				],
				powerSort: [
					{
						required: true,
						message: '请输入权限标识',
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
				label: 'powerName'
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
					this.editId = newValue[0].powerCode;
					const optionsTemp = deleteTreeNodeById(this.authorizeData, this.editId, 'powerCode');
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
			this.formData.parentId = data.powerCode;
			this.parentName = data.powerName;
		}
	}
};
</script>

<style>
</style>
