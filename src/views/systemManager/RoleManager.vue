<template>
	<div class="app-container">
		<el-row :gutter="15">
			<div class="head-container">
				<!-- 功能按钮 -->
				<Button
					@showDialogAdd="showDialogAddHandler"
					@showDialogEdit="showDialogEditHandler"
					@showDelete="showDeleteHandler"
					:selectData_p="selectData"
					:delTips_p="delTips"
					:authorize_p="'role'"
				></Button>
			</div>
			<el-col :xs="24" :sm="24" :md="16" :lg="16" :xl="17" style="margin-bottom: 10px">
				<el-card class="box-card" shadow="never">
					<div slot="header" class="clearfix">
						<span class="role-span">角色列表</span>
					</div>
					<RoleSearchForm @searchForm="searchFormHandler"></RoleSearchForm>
					<!--表格渲染-->
					<Table ref="tableDom" :data.sync="tableData" :tableColumn_p="tableColumn" :selectData_p.sync="selectData">
						<el-table-column label="创建时间">
							<template slot-scope="scope">
								{{ scope.row.createDate | formatDate }}
							</template>
						</el-table-column>
						<el-table-column label="更新时间">
							<template slot-scope="scope">
								{{ scope.row.updateDate | formatDate }}
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
									v-authorize="{ name: 'update', type: 'role', id: 'btn-update-row' }"
									@click="editSingleHandler(scope.row)"
								></el-button>
								<el-button
									id="btn-remove-row"
									type="danger"
									icon="el-icon-delete"
									v-authorize="{ name: 'remove', type: 'role', id: 'btn-remove-row' }"
									@click="deleteSingleHandler(scope.row)"
								></el-button>
							</template>
						</el-table-column>
					</Table>
					<Pagination :total="total" :pageIndex_p.sync="pageIndex" :pageSize_p.sync="pageSize"></Pagination>
				</el-card>
			</el-col>
			<!-- 角色授权 -->
			<el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="7">
				<el-card class="box-card" shadow="never">
					<div slot="header" class="clearfix">
						<el-tooltip class="item" effect="dark" content="选择指定角色分配权限" placement="top">
							<span class="role-span">权限分配</span>
						</el-tooltip>
						<el-button icon="el-icon-check" size="mini" style="float: right; padding: 6px 9px" type="primary" @click="saveMenu">保存</el-button>
					</div>
					<el-tree ref="tree" :props="defaultProps" :data="authorizeData" node-key="powerCode" show-checkbox></el-tree>
				</el-card>
			</el-col>
		</el-row>
		<Dialog :title="dialogTitle" :visible.sync="isShowAEDialog">
			<RoleAddForm
				v-if="isShowAEDialog"
				:isShowAEDialog_p.sync="isShowAEDialog"
				:isRefreshList_p.sync="isRefreshList"
				:selectData_p="selectData"
			></RoleAddForm>
		</Dialog>
	</div>
</template>

<script>
// eslint-disable-next-line import/no-cycle
import { roleDeleteService, roleListService, roleAuthorizeService, roleDetailService } from '@s/system/RoleService';
// eslint-disable-next-line import/no-cycle
import { authorizeListService } from '@s/system/AuthorizeService';
import Button from '@c/ui/Button';
import Table from '@c/ui/Table';
import Pagination from '@c/ui/Pagination';
import Dialog from '@c/ui/Dialog';
import RoleAddForm from '@f/system/role/RoleAdd.form';
import RoleSearchForm from '@f/system/role/RoleSearch.form';
import ListMixin from '@m/List.mixin';

export default {
	mixins: [ListMixin],
	components: {
		Table,
		Pagination,
		Button,
		Dialog,
		RoleAddForm,
		RoleSearchForm
	},
	data() {
		return {
			// 表格
			tableColumn: [
				{
					label: '角色名称',
					field: 'roleName'
				},
				{
					label: '描述',
					field: 'des'
				}
			],
			delTips: '',
			authorizeData: [],
			defaultProps: { children: 'children', label: 'powerName' }
		};
	},
	computed: {
		dialogTitle() {
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
			if (newValue) {
				this.roleList();
				this.pageIndex = 1;
			}
		}
	},
	mounted() {
		this.authorizeList();
		this.roleList();
	},
	methods: {
		async authorizeList() {
			const dataJson = {};
			const res = await authorizeListService(dataJson);
			this.authorizeData = res;
		},
		async roleList() {
			const dataJson = {
				pageNum: this.pageIndex,
				pageSize: this.pageSize,
				roleName: '',
				...this.searchForm
			};
			const res = await roleListService(dataJson);
			console.log(res);
			this.listMixin(res);
		},
		showDialogAddHandler() {
			this.dialogAddHandlerMixin();
			this.$refs.tableDom.clearSelection();
		},
		async showDialogEditHandler() {
			const editId = this.dialogEditHandlerMixin();
			const dataJson = {
				roleId: editId
			};
			const res = await roleDetailService(dataJson);
			this.selectData = [res];
			this.$refs.tree.setCheckedKeys(this.selectData[0].powerCodes);
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
			const dataJson = {
				roleId: row.id
			};
			const res = await roleDetailService(dataJson);
			this.editSingleHandlerMixin(res);
			this.$refs.tree.setCheckedKeys(res.powerCodes);
		},
		deleteSingleHandler(row) {
			this.deleteSingleHandlerMixin(row);
		},
		searchFormHandler(searchForm) {
			this.searchFormHandlerMixin(searchForm);
			this.roleList();
		},
		async saveMenu() {
			const checkedNodes = this.$refs.tree.getCheckedNodes();
			const lastNodesArr = this.lastNodesMixin(checkedNodes);
			const ids = lastNodesArr.map(item => {
				return item.powerCode;
			});
			const dataJson = {
				roleId: this.editId,
				powers: ids
			};
			await roleAuthorizeService(dataJson);
			this.$store.commit('setRefreshAside', true);
		}
	}
};
</script>

<style>
</style>
