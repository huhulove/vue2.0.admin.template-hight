<template>
	<el-row>
		<el-col :span="24">
			<el-form ref="roleForm" :model="roleForm" :rules="roleRules" label-width="66px">
				<el-form-item label="名称" prop="roleName">
					<el-input v-model="roleForm.roleName" placeholder="请输入角色名称" />
				</el-form-item>
				<el-form-item label="状态" prop="state">
					<el-radio-group style="width: 200px" v-model="roleForm.state">
						<el-radio :label="0">正常</el-radio>
						<el-radio :label="1">禁用</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="描述">
					<el-input type="textarea" :rows="4" v-model.number="roleForm.des" placeholder="请输入角色描述" />
				</el-form-item>
			</el-form>
		</el-col>
		<el-col :span="24" style="text-align: right">
			<span class="dialog-footer">
				<el-button @click="roleFormCancel">取 消</el-button>
				<el-button type="primary" @click="roleFormSubmit">确 定</el-button>
			</span>
		</el-col>
	</el-row>
</template>

<script>
import { roleAddService, roleEditService } from '@s/system/RoleService';

export default {
	props: ['selectData_p'],
	data() {
		return {
			editId: -1,
			roleForm: {
				roleName: '',
				state: 0,
				des: ''
			},
			roleRules: {
				roleName: [
					{
						required: true,
						message: '请输入角色名称',
						trigger: 'blur'
					}
				],
				state: [
					{
						required: true,
						message: '请选择角色状态',
						trigger: 'blur'
					}
				]
			}
		};
	},
	watch: {
		selectData_p: {
			handler(newValue) {
				if (newValue.length > 0) {
					this.editId = newValue[0].id;
					this.roleForm = { ...newValue[0] };
				}
			},
			deep: true,
			immediate: true
		}
	},
	methods: {
		roleFormSubmit() {
			this.$refs.roleForm.validate(async valid => {
				if (valid) {
					if (this.editId === -1) {
						await roleAddService(this.roleForm);
					} else {
						const dataJson = {
							id: this.editId,
							...this.roleForm
						};
						await roleEditService(dataJson);
					}
					this.$emit('update:isRefreshList_p', true);
					this.roleFormCancel();
				} else {
					this.$emit('update:isRefreshList_p', false);
				}
			});
		},
		roleFormCancel() {
			this.$emit('update:isShowAEDialog_p', false);
		}
	}
};
</script>

<style>
</style>
