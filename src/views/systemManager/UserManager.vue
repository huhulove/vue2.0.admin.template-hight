<template>
	<div class="app-container">
		<!-- 搜索区域 -->
		<UserSearchForm @searchForm="searchFormHandler"></UserSearchForm>
		<!-- 顶部按钮 -->
		<Button
			@showDialogAdd="showDialogAddHandler"
			@showDialogEdit="showDialogEditHandler"
			@showDelete="showDeleteHandler"
			:selectData_p="selectData"
			:delTips_p="delTips"
			:authorize_p="'user'"
		></Button>
		<!--表格渲染-->
		<Table ref="tableDom" :data.sync="tableData" :tableColumn_p="tableColumn" :selectData_p.sync="selectData">
			<el-table-column label="角色">
				<template slot-scope="scope">
					{{ scope.row.roleNames.join(',') }}
				</template>
			</el-table-column>
			<el-table-column label="状态" width="70">
				<template slot-scope="scope">
					{{ scope.row.status === 0 ? '正常' : '禁用' }}
				</template>
			</el-table-column>
			<el-table-column label="操作" align="left" fixed="right" width="300">
				<template slot-scope="scope">
					<el-button id="btn-update-row" type="primary" v-authorize="{ name: 'update', type: 'user', id: 'btn-update-row' }" @click="editSingleHandler(scope.row)">
						编辑
					</el-button>
					<el-button id="btn-remove-row" type="danger" v-authorize="{ name: 'remove', type: 'user', id: 'btn-remove-row' }" @click="deleteSingleHandler(scope.row)">
						删除
					</el-button>
					<el-button id="btn-secret-row" type="success" v-authorize="{ name: 'secret', type: 'user', id: 'btn-secret-row' }" @click="resetPasswordHandler(scope.row)">
						重置密码
					</el-button>
				</template>
			</el-table-column>
		</Table>
		<!-- 分页 -->
		<Pagination :total="total" :pageIndex_p.sync="pageIndex" :pageSize_p.sync="pageSize"></Pagination>
		<!-- AEForm -->
		<Dialog :title="AEDialogTitle" :visible.sync="isShowAEDialog">
			<UserAEForm v-if="isShowAEDialog" :isShowAEDialog_p.sync="isShowAEDialog" :isRefreshList_p.sync="isRefreshList" :selectData_p="selectData"></UserAEForm>
		</Dialog>
	</div>
</template>

<script>
import { hgetStorage } from '@u/htools.web';
import ListMixin from '@m/List.mixin';

import Button from '@c/ui/Button';
import Table from '@c/ui/Table';
import Dialog from '@c/ui/Dialog';
import Pagination from '@c/ui/Pagination';

import UserSearchForm from '@f/system/user/UserSearch.form';
import UserAEForm from '@f/system/user/UserAdd.form';

// eslint-disable-next-line import/no-cycle
import { userDeleteService, userListService, userDetailService, userPasswordEditService } from '@s/system/UserService';

export default {
	mixins: [ListMixin],
	components: {
		Button,
		Table,
		Pagination,
		Dialog,
		UserSearchForm,
		UserAEForm
	},
	data() {
		const tableColumn = [
			{
				label: '序号',
				field: 'id',
				columnWidth: 55
			},
			{
				label: '用户名',
				field: 'userName',
				columnWidth: 100
			},
			{
				label: '密码',
				field: 'userPwd',
				columnWidth: 100
			},
			{
				label: '昵称',
				field: 'nickName',
				columnWidth: 100
			},
			{
				label: '手机号',
				field: 'phone',
				columnWidth: 100
			},
			{
				label: '部门',
				field: 'department.name'
			},
			{
				label: '生日',
				field: 'birthday',
				type: 'date'
			},
			{
				label: '创建日期',
				field: 'createDate',
				type: 'date'
			},
			{
				label: '更新日期',
				field: 'updateDate',
				type: 'date'
			},
			{
				label: '备注',
				field: 'remark',
				columnWidth: 200
			}
		];
		const userRolesId = hgetStorage('roleIds');
		if (userRolesId.indexOf(this.$globalConfig.superAdminRoleId) === 0) {
			tableColumn.splice(4, 0, {
				label: '企业',
				field: 'company.name',
				columnWidth: 100
			});
		}
		return {
			// 表格
			tableColumn: tableColumn,
			delTips: ''
		};
	},
	computed: {
		AEDialogTitle() {
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
			this.pageIndex = 1;
			if (newValue) {
				this.userList();
			}
		}
	},
	mounted() {
		this.userList();
	},
	methods: {
		async userList() {
			const dataJson = {
				pageIndex: this.pageIndex,
				pageSize: this.pageSize,
				...this.searchForm
			};
			const res = await userListService(dataJson);
			this.listMixin(res);
		},
		showDialogAddHandler() {
			this.dialogAddHandlerMixin();
		},
		async showDialogEditHandler() {
			const editId = this.dialogEditHandlerMixin();
			const dataJson = {
				id: editId
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
				id: row.id
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
		async resetPasswordHandler(row) {
			const dataJson = {
				id: row.id
			};
			await userPasswordEditService(dataJson);
		}
	}
};
</script>

<style lang="less" scoped>
.orglist {
	height: 400px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
}
</style>
