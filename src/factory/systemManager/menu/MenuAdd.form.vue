<template>
	<DataForm :model_p="formData" :rules_p="formRules" :labelWidth_p="'110px'" @cancel="formCancel" @submit="formSubmit">
		<el-form-item label="名称" prop="menuName">
			<Input v-model="formData.menuName" placeholder="请输入菜单名称" />
		</el-form-item>
		<el-form-item label="是否外链">
			<RadioGroup v-model="formData.isOutsideLink" :data_p="outsideLinkData" @change="outsideLinkHandler"></RadioGroup>
		</el-form-item>
		<el-form-item label="是否新窗口打开" v-if="formData.isOutsideLink === 1">
			<RadioGroup v-model="formData.isNewWindow" :data_p="targetData" @change="newWindowHandler"></RadioGroup>
		</el-form-item>
		<el-form-item label="链接地址" v-if="formData.isOutsideLink === 1">
			<Input v-model="formData.url" placeholder="请输入链接地址" />
		</el-form-item>
		<el-form-item label="排序" prop="menuSort">
			<Input v-model="formData.menuSort" placeholder="请输入排序" />
		</el-form-item>
		<el-form-item label="图标">
			<el-popover placement="bottom-start" width="450" trigger="click" @show="$refs['iconSelect'].reset()">
				<IconSelect ref="iconSelect" @selected="selectedIcon" />
				<el-input slot="reference" v-model="formData.menuIcon" style="width: 100%" placeholder="点击选择图标" readonly>
					<svg-icon v-if="formData.menuIcon" slot="prefix" :icon-class="formData.menuIcon" class="el-input__icon" style="height: 32px; width: 16px" />
					<i v-else slot="prefix" class="el-icon-search el-input__icon" />
				</el-input>
			</el-popover>
		</el-form-item>
		<el-form-item label="路由链接" v-if="formData.isOutsideLink === 0">
			<Input v-model="formData.routeUrl" placeholder="请输入组件地址" />
		</el-form-item>
		<el-form-item label="路由名称" v-if="formData.isOutsideLink === 0">
			<Input v-model="formData.routeName" placeholder="请输入路由名称" />
		</el-form-item>
		<el-form-item label="状态">
			<RadioGroup v-model="formData.status" :data_p="statusData"></RadioGroup>
		</el-form-item>
		<el-form-item label="父级">
			<SelectTree v-model="formData.pid" node-key="id" :data="menuData" placeholder="请选择父级"></SelectTree>
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
import IconSelect from '@c/ui/IconSelect';

import { menuAddService, menuEditService, menuListService } from '@s/systemManager/MenuService';

export default {
	props: ['selectData_p'],
	components: {
		SelectTree,
		RadioGroup,
		DataForm,
		Input,
		IconSelect
	},
	data() {
		return {
			editId: -1,
			formData: {
				menuName: '',
				url: '',
				routeUrl: '',
				menuSort: '',
				menuIcon: '',
				isShow: 0,
				status: 0,
				pid: 0,
				routeName: '',
				isOutsideLink: 0,
				isNewWindow: 1,
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
				routeUrl: [
					{
						required: true,
						message: '请输入路由地址',
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
				menuSort: [
					{
						validator: hpositiveIntegerValid,
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
			outsideLinkData: [
				{ label: '是', value: 1 },
				{ label: '否', value: 0 }
			],
			targetData: [
				{ label: '是', value: 1 },
				{ label: '否', value: 0 }
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
		// 选中图标
		selectedIcon(name) {
			this.formData.menuIcon = name;
		},
		async menuList() {
			const dataJson = {};
			const res = await menuListService(dataJson);
			this.menuData = res;
		},
		outsideLinkHandler() {
			this.formData.routeName = '';
			this.formData.routeUrl = '';
		},
		newWindowHandler() {
			if (this.formData.isNewWindow === 0) {
				this.formData.routeName = 'Iframe';
				this.formData.routeUrl = 'iframe';
			}
			if (this.formData.isNewWindow === 1) {
				this.formData.routeName = '';
				this.formData.routeUrl = '';
			}
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
