<template>
	<DataForm :model="formData" :rules="formRules" @cancel="formCancel" @submit="formSubmit">
		<el-form-item label="名称" prop="menuName">
			<Input v-model="formData.menuName" placeholder="请输入菜单名称" />
		</el-form-item>
		<el-form-item label="链接地址">
			<Input v-model="formData.url" placeholder="请输入链接地址" />
		</el-form-item>
		<el-form-item label="排序">
			<Input v-model="formData.menuSort" placeholder="请输入排序" />
		</el-form-item>
		<el-form-item label="图标">
			<Input v-model="formData.menuIcon" placeholder="请输入图标" />
		</el-form-item>
		<el-form-item label="路由名称">
			<Input v-model="formData.routeName" placeholder="请输入路由名称" />
		</el-form-item>
		<!-- <el-form-item label="是否显示" prop="isShow">
					<el-select v-model="formData.isShow" class="select-item" placeholder="请选择">
						<el-option label="显示" :value="0"></el-option>
						<el-option label="不显示" :value="1"></el-option>
					</el-select>
				</el-form-item> -->
		<!-- <el-form-item label="按钮类型">
					<el-select v-model="formData.btnType" class="select-item" placeholder="请选择">
						<el-option label="请选择" :value="2"></el-option>
						<el-option label="弹框" :value="0"></el-option>
						<el-option label="页签" :value="1"></el-option>
					</el-select>
				</el-form-item> -->
		<el-form-item label="状态">
			<Radio v-model="formData.status" :data_p="statusData"></Radio>
		</el-form-item>
		<el-form-item label="是否外链">
			<Radio v-model="formData.targetProperty" :data_p="targetData"></Radio>
		</el-form-item>
		<el-form-item label="父级">
			<SelectTree v-model="formData.pid" node-key="id" :data="menuData" placeholder="请选择父级"></SelectTree>
		</el-form-item>
	</DataForm>
</template>

<script>
import { deleteTreeNodeById } from '@u/htools.tree';

import SelectTree from '@c/ui/SelectTree';
import Radio from '@c/ui/Radio';
import Input from '@c/ui/Input';
import DataForm from '@c/ui/DataForm';

import { menuAddService, menuEditService, menuListService } from '@s/system/MenuService';

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
			formData: {
				menuName: '',
				url: '',
				menuSort: '',
				menuIcon: '1',
				isShow: 0,
				status: 0,
				pid: 0,
				routeName: '',
				targetProperty: '_self',
				btnType: 0
			},
			formRules: {
				menuName: [
					{
						required: true,
						message: '请输入菜单名称',
						trigger: 'blur'
					}
				],
				url: [
					{
						required: true,
						message: '请输入外链',
						trigger: 'blur'
					}
				],
				routeName: [
					{
						required: true,
						message: '请输入路由名称',
						trigger: 'blur'
					}
				],
				btnType: [
					{
						required: true,
						message: '请选择类型',
						trigger: 'change'
					}
				],
				isShow: [
					{
						required: true,
						message: '请选择类型',
						trigger: 'change'
					}
				]
			},
			menuData: null,
			statusData: [
				{ label: '正常', value: 0 },
				{ label: '禁用', value: 1 }
			],
			targetData: [
				{ label: '是', value: '_blank' },
				{ label: '否', value: '_self' }
			]
		};
	},
	watch: {
		selectData_p: {
			async handler(newValue) {
				this.menuData === null && (await this.menuList());
				if (newValue.length > 0) {
					this.editId = newValue[0].id;
					const optionsTemp = deleteTreeNodeById(this.menuData, this.editId);
					this.menuData = [...optionsTemp];
					this.formData = { ...newValue[0] };
				}
			},
			deep: true,
			immediate: true
		}
	},
	methods: {
		async menuList() {
			const dataJson = {};
			const res = await menuListService(dataJson);
			this.menuData = res;
		},
		async formSubmit(valid) {
			if (valid) {
				if (this.editId === -1) {
					await menuAddService(this.formData);
				} else {
					const dataJson = {
						id: this.editId,
						...this.formData
					};
					await menuEditService(dataJson);
				}
				this.$emit('update:isRefreshList_p', true);
				this.formCancel();
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
