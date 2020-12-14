<template>
	<el-row>
		<el-col :span="24">
			<el-form ref="userForm" :model="userForm" :rules="userRules" size="small" label-width="66px">
				<el-form-item label="用户名" prop="userName">
					<el-input v-model="userForm.userName" placeholder="请输入用户名" />
				</el-form-item>
				<el-form-item label="密码" prop="userPwd">
					<el-input v-model.number="userForm.userPwd" placeholder="请输入密码" />
				</el-form-item>
				<el-form-item label="昵称" prop="nickName">
					<el-input v-model="userForm.nickName" placeholder="请输入昵称" />
				</el-form-item>
				<el-form-item label="角色" prop="roleIds">
					<el-select v-model="userForm.roleIds" multiple filterable placeholder="请选择角色" class="select-item">
						<el-option v-for="(role, index) in roleData" :key="index" :label="role.roleName" :value="role.id"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="状态" prop="state">
					<el-radio-group style="width: 200px" v-model="userForm.state">
						<el-radio :label="0">启用</el-radio>
						<el-radio :label="1">不启用</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="备注">
					<el-input type="textarea" :rows="4" v-model="userForm.remark"></el-input>
				</el-form-item>
			</el-form>
		</el-col>
		<el-col :span="24" style="text-align: right">
			<span class="dialog-footer">
				<el-button @click="userFormCancel">取 消</el-button>
				<el-button type="primary" @click="userFormSubmit">确 定</el-button>
			</span>
		</el-col>
	</el-row>
</template>

<script>
// eslint-disable-next-line import/named
import { userAddService, userEditService, userRoleService } from '@s/system/UserService';
// eslint-disable-next-line import/no-cycle
import { roleListService } from '@s/system/RoleService';

export default {
	props: ['selectData_p'],
	data() {
		return {
			editId: -1,
			// 弹窗
			userForm: {
				userName: '',
				userPwd: '',
				nickName: '',
				state: 0,
				remark: '',
				roleIds: null
			},
			userRules: {
				userName: [
					{ required: true, message: '请输入用户名', trigger: 'blur' },
					{ min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
				],
				userPwd: [{ required: true, message: '请输入密码', trigger: 'blur' }],
				nickName: [{ required: true, message: '请输入用户昵称', trigger: 'blur' }],
				state: [{ required: true, message: '请选择状态', trigger: 'change' }],
				roleIds: [
					{
						required: true,
						message: '请选择角色',
						trigger: 'change'
					}
				]
			},
			roleData: []
		};
	},
	watch: {
		selectData_p: {
			handler(newValue) {
				if (newValue.length > 0) {
					this.editId = newValue[0].id;
					this.userForm = { ...newValue[0] };
					this.userForm.roleIds = newValue[0].userRoles;
				}
			},
			deep: true,
			immediate: true
		}
	},
	created() {
		this.roleList();
	},
	methods: {
		async roleList() {
			const dataJson = {
				pageNum: 1,
				pageSize: 10000,
				roleName: ''
			};
			const res = await roleListService(dataJson);
			console.log(res);
			this.roleData = res.records;
		},
		userFormSubmit() {
			this.$refs.userForm.validate(async valid => {
				if (valid) {
					if (this.editId === -1) {
						await userAddService(this.userForm);
					} else {
						const dataJson = {
							id: this.editId,
							...this.userForm
						};
						await userEditService(dataJson);
						const dataJson_c = {
							roleIds: this.userForm.roleIds,
							userId: this.editId
						};
						await userRoleService(dataJson_c);
					}
					this.$emit('update:isRefreshList_p', true);
					this.userFormCancel();
				} else {
					this.$emit('update:isRefreshList_p', false);
				}
			});
		},
		userFormCancel() {
			this.$emit('update:isShowAEDialog_p', false);
		}
	}
};
</script>

<style lang="less" scoped>
</style>
