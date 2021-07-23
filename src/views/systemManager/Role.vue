<template>
	<div class="app-container">
		<el-row :gutter="15">
			<!-- 功能按钮 -->
			<Button
				@showDialogAdd="showDialogAddHandler"
				@showDialogEdit="showDialogEditHandler"
				@showDelete="showDeleteHandler"
				:selectData_p="selectData"
				:delTips_p="delTips"
				:authorize_p="'role'"
			></Button>
			<el-col :xs="24" :sm="24" :md="16" :lg="16" :xl="18">
				<Card>
					<div slot="header" class="clearfix">
						<span class="role-span">角色列表</span>
					</div>
					<!-- 搜索区域 -->
					<RoleSearchForm @searchForm="searchFormHandler"></RoleSearchForm>
					<!--表格渲染-->
					<Table ref="tableDom" :data.sync="tableData" :tableColumn_p="tableColumn" :selectData_p.sync="selectData">
						<el-table-column label="状态" width="70">
							<template slot-scope="scope">{{ scope.row.status === 0 ? '正常' : '禁用' }}</template>
						</el-table-column>
						<el-table-column label="操作" align="left" fixed="right" width="300">
							<template slot-scope="scope">
								<el-button
									id="btn-update-row"
									type="primary"
									v-authorize="{ name: 'update', type: 'role', id: 'btn-update-row' }"
									@click="editSingleHandler(scope.row)"
								>
									编辑
								</el-button>
								<el-button
									id="btn-remove-row"
									type="danger"
									v-authorize="{ name: 'remove', type: 'role', id: 'btn-remove-row' }"
									@click="deleteSingleHandler(scope.row)"
								>
									删除
								</el-button>
								<el-button
									id="btn-remove-row"
									type="success"
									v-authorize="{ name: 'rolePowerConf', type: 'role', id: 'btn-remove-row' }"
									@click="setAuthorizeHandler(scope.row)"
								>
									设置权限
								</el-button>
							</template>
						</el-table-column>
					</Table>
					<!-- 分页 -->
					<Pagination :total_p="total" :pageIndex_p.sync="pageIndex" :pageSize_p.sync="pageSize"></Pagination>
				</Card>
			</el-col>
			<!-- 角色授权 -->
			<el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="6">
				<Card>
					<div slot="header" class="clearfix">
						<el-tooltip class="item" effect="dark" content="选择指定角色分配权限" placement="top">
							<span class="role-span">权限分配</span>
						</el-tooltip>
						<el-button :disabled="editId === -1" icon="el-icon-check" size="mini" style="float: right; padding: 6px 9px" type="primary" @click="saveMenu">
							保存
						</el-button>
					</div>
					<AuthorizeTree ref="authorizeTreeEle" :hasPowerCodes_p="hasPowerCodes"></AuthorizeTree>
				</Card>
			</el-col>
		</el-row>
		<Dialog :title_p="AEDialogTitle" :visible_p.sync="isShowAEDialog">
			<RoleAddForm v-if="isShowAEDialog" :isShowAEDialog_p.sync="isShowAEDialog" :isRefreshList_p.sync="isRefreshList" :selectData_p="selectData"></RoleAddForm>
		</Dialog>
	</div>
</template>

<script>
import { hgetStorage } from '@u/htools.web';
import ListMixin from '@m/List.mixin';

import Button from '@c/ui/Button';
import Table from '@c/ui/Table';
import Pagination from '@c/ui/Pagination';
import Dialog from '@c/ui/Dialog';
import Card from '@c/ui/Card';

import RoleAddForm from '@f/systemManager/role/RoleAdd.form';
import RoleSearchForm from '@f/systemManager/role/RoleSearch.form';
import AuthorizeTree from '@f/layout/AuthorizeTree';

// eslint-disable-next-line import/no-cycle
import { roleDeleteService, roleListService, roleAuthorizeService, roleDetailService } from '@s/systemManager/RoleService';

export default {
	mixins: [ListMixin],
	components: {
		Table,
		Pagination,
		Button,
		Dialog,
		Card,
		RoleAddForm,
		RoleSearchForm,
		AuthorizeTree
	},
	data() {
		const tableColumn = [
			{
				label: '序号',
				field: 'id',
				columnWidth: 55
			},
			{
				label: '角色名称',
				field: 'name',
				columnWidth: 100
			},
			{
				label: '描述',
				field: 'remark'
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
			}
		];
		const userRolesId = hgetStorage('roleIds');
		if (userRolesId.indexOf(this.$globalConfig.superAdminRoleId) === 0) {
			tableColumn.splice(2, 0, {
				label: '企业',
				field: 'company.name',
				columnWidth: 100
			});
		}
		return {
			// 表格
			tableColumn: tableColumn,
			delTips: '',
			hasPowerCodes: null
		};
	},
	computed: {
		AEDialogTitle() {
			return this.editId === -1 ? '新增角色' : '编辑角色';
		}
	},
	watch: {
		pageIndex(newValue) {
			this.pageIndex = newValue;
			this.roleList();
		},
		pageSize(newValue) {
			this.pageSize = newValue;
			this.roleList();
		},
		isRefreshList(newValue) {
			this.pageIndex = 1;
			if (newValue) {
				this.roleList();
			}
		}
	},
	mounted() {
		this.roleList();
	},
	methods: {
		async roleList() {
			const dataJson = {
				pageIndex: this.pageIndex,
				pageSize: this.pageSize,
				...this.searchForm
			};
			const res = await roleListService(dataJson);
			this.listMixin(res);
		},
		showDialogAddHandler() {
			this.dialogAddHandlerMixin();
			this.$refs.tableDom.clearSelection();
		},
		async showDialogEditHandler() {
			const editId = this.dialogEditHandlerMixin();
			const dataJson = {
				id: editId
			};
			const res = await roleDetailService(dataJson);
			this.selectData = [res];
			this.setAuthorizeHandler(res);
		},
		async showDeleteHandler() {
			const ids = this.filterSelectIdsMixin();
			const dataJson = {
				ids: ids
			};
			await roleDeleteService(dataJson);
			this.isRefreshList = true;
		},
		async editSingleHandler(row) {
			const res = await this.roleDetail(row);
			this.editSingleHandlerMixin(res);
			this.setAuthorizeHandler(res);
		},
		deleteSingleHandler(row) {
			this.deleteSingleHandlerMixin(row);
		},
		searchFormHandler(searchForm) {
			this.searchFormHandlerMixin(searchForm);
			this.roleList();
		},
		async setAuthorizeHandler(row) {
			const res = await this.roleDetail(row);
			this.hasPowerCodes = res.powerCodes;
		},
		async roleDetail(row) {
			const dataJson = {
				id: row.id
			};
			this.editId = row.id;
			const res = await roleDetailService(dataJson);
			return res;
		},

		async saveMenu() {
			const checkedNodes = this.$refs.authorizeTreeEle.$refs.tree.getCheckedNodes();
			const halfCheckedNodes = this.$refs.authorizeTreeEle.$refs.tree.getHalfCheckedNodes();
			const ids = checkedNodes.map(item => {
				return item.powerCode;
			});

			const ids1 = halfCheckedNodes.map(item => {
				return item.powerCode;
			});

			const dataJson = {
				id: this.editId,
				powerCodes: Array.from(new Set([...ids, ...ids1]))
			};
			await roleAuthorizeService(dataJson);
			this.$store.commit('setRefreshAside', true);
		}
	}
};
</script>

<style>
</style>
