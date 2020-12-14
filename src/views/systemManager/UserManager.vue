<template>
	<div class="app-container">
		<div class="head-container">
			<!-- 搜索区域 -->
			<UserSearchform @searchForm="searchFormHandler"></UserSearchform>
			<div>
				<!-- 功能按钮 -->
				<Button
					@showDialogAdd="showDialogAddHandler"
					@showDialogEdit="showDialogEditHandler"
					@showDelete="showDeleteHandler"
					:selectData_p="selectData"
					:delTips_p="delTips"
					:authorize_p="'user'"
				></Button>
			</div>
		</div>
		<!--表格渲染-->
		<Table ref="tableDom" :data.sync="tableData" :tableColumn_p="tableColumn" :selectData_p.sync="selectData">
			<el-table-column label="创建时间">
				<template slot-scope="scope">
					{{ scope.row.createDate | formatDate }}
				</template>
			</el-table-column>
			<el-table-column label="状态">
				<template slot-scope="scope">
					{{ scope.row.state === 0 ? '正常' : '禁用' }}
				</template>
			</el-table-column>
			<el-table-column label="操作" align="center" fixed="right">
				<template slot-scope="scope">
					<el-button
						id="btn-update-row"
						type="primary"
						icon="el-icon-edit"
						v-authorize="{ name: 'update', type: 'user', id: 'btn-update-row' }"
						@click="editSingleHandler(scope.row)"
					></el-button>
					<el-button
						id="btn-remove-row"
						type="danger"
						icon="el-icon-delete"
						v-authorize="{ name: 'remove', type: 'user', id: 'btn-remove-row' }"
						@click="deleteSingleHandler(scope.row)"
					></el-button>
					<el-button
						id="btn-secret-row"
						type="danger"
						v-authorize="{ name: 'secret', type: 'user', id: 'btn-secret-row' }"
						@click="editPasswordHandler(scope.row)"
					>
						修改密码
					</el-button>
				</template>
			</el-table-column>
		</Table>
		<Pagination :total="total" :pageIndex_p.sync="pageIndex" :pageSize_p.sync="pageSize"></Pagination>
		<Dialog :title="dialogTitle" :visible.sync="isShowAEDialog">
			<UserAddForm
				v-if="isShowAEDialog"
				:isShowAEDialog_p.sync="isShowAEDialog"
				:isRefreshList_p.sync="isRefreshList"
				:selectData_p="selectData"
			></UserAddForm>
		</Dialog>
		<Dialog title="修改密码" :visible.sync="isShowPasswordDialog">
			<UserPasswordForm
				v-if="isShowPasswordDialog"
				:isShowPasswordDialog_p.sync="isShowPasswordDialog"
				:isRefreshList_p.sync="isRefreshList"
				:editId_p="editId"
			></UserPasswordForm>
		</Dialog>
	</div>
</template>

<script>
// eslint-disable-next-line import/no-cycle
import { userDeleteService, userListService, userDetailService } from '@s/system/UserService';
import Button from '@c/ui/Button';
import UserSearchform from '@f/system/user/UserSearch.form';
import Table from '@c/ui/Table';
import Pagination from '@c/ui/Pagination';
import Dialog from '@c/ui/Dialog';
import UserAddForm from '@f/system/user/UserAdd.form';
import UserPasswordForm from '@f/system/user/UserPassword.form';
import ListMixin from '@m/List.mixin';

export default {
	mixins: [ListMixin],
	components: {
		UserSearchform,
		Button,
		Table,
		Pagination,
		Dialog,
		UserAddForm,
		UserPasswordForm
	},
	data() {
		return {
			// 表格
			tableColumn: [
				{
					label: '用户名',
					field: 'userName'
				},
				{
					label: '昵称',
					field: 'nickName'
				},
				{
					label: '角色',
					field: 'userRoles'
				},
				{
					label: '备注',
					field: 'remark'
				}
			],
			delTips: '',
			isShowPasswordDialog: false
		};
	},
	computed: {
		dialogTitle() {
			return this.editId === -1 ? '新增用户' : '编辑用户';
		}
	},
	watch: {
		pageIndex(newValue) {
			this.pageIndex = newValue;
			this.userList();
		},
		pageSize(newValue) {
			this.pageSize = newValue;
			this.userList();
		},
		isRefreshList(newValue) {
			if (newValue) {
				this.userList();
				this.pageIndex = 1;
			}
		}
	},
	mounted() {
		this.userList();
	},
	methods: {
		async userList() {
			const dataJson = {
				pageNum: this.pageIndex,
				pageSize: this.pageSize,
				userName: '',
				...this.searchForm
			};
			const res = await userListService(dataJson);
			console.log(res);
			this.listMixin(res);
		},
		showDialogAddHandler() {
			this.dialogAddHandlerMixin();
		},
		async showDialogEditHandler() {
			const editId = this.dialogEditHandlerMixin();
			const dataJson = {
				userId: editId
			};
			const res = await userDetailService(dataJson);
			this.selectData = [res];
		},
		async showDeleteHandler() {
			const ids = this.filterSelectIdsMixin();
			const dataJson = {
				ids: ids
			};
			await userDeleteService(dataJson);
			this.isRefreshList = true;
		},
		async editSingleHandler(row) {
			const dataJson = {
				userId: row.id
			};
			const res = await userDetailService(dataJson);
			this.editSingleHandlerMixin(res);
		},
		deleteSingleHandler(row) {
			this.deleteSingleHandlerMixin(row);
		},
		searchFormHandler(searchForm) {
			this.searchFormHandlerMixin(searchForm);
			this.userList();
		},
		editPasswordHandler(row) {
			this.isShowPasswordDialog = true;
			this.editId = row.id;
		}
	}
};
</script>

<style lang="less" scoped>
</style>
