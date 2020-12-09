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
						<el-table-column label="是否删除">
							<template slot-scope="scope">
								{{ scope.row.isDel === 0 ? '正常' : '删除' }}
							</template>
						</el-table-column>
						<el-table-column label="状态">
							<template slot-scope="scope">
								{{ scope.row.state === 0 ? '正常' : '禁用' }}
							</template>
						</el-table-column>
						<el-table-column label="操作" align="center" fixed="right">
							<template slot-scope="scope">
								<el-button type="primary" icon="el-icon-edit" size="mini" @click="editSingleHandler(scope.row)"></el-button>
								<el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteSingleHandler(scope.row)"></el-button>
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
					<el-tree ref="tree" :props="defaultProps" :data="authorizeData" node-key="id" show-checkbox></el-tree>
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
import { roleDeleteService, roleListService, roleAuthorizeService } from '@s/system/RoleService';
// eslint-disable-next-line import/no-cycle
import { authorizeListService } from '@s/system/AuthorizeService';
import Button from '@c/ui/Button';
import Table from '@c/ui/Table';
import Pagination from '@c/ui/Pagination';
import Dialog from '@c/ui/Dialog';
import RoleAddForm from '@f/system/RoleAdd.form';
import RoleSearchForm from '@f/system/RoleSearch.form';

export default {
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
			// 分页
			total: 1,
			pageIndex: 1,
			pageSize: 10,
			// 表格
			tableColumn: [
				{
					label: '角色名称',
					field: 'roleName'
				},
				{
					label: '描述',
					field: 'des'
				},
				{
					label: '创建时间',
					field: 'createDate'
				},
				{
					label: '更新时间',
					field: 'updateDate'
				}
			],
			tableData: [],
			selectData: [],
			// 搜索
			searchForm: {},
			delTips: '',
			editId: -1,
			isShowAEDialog: false,
			isRefreshList: false,
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
			console.log(newValue);
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
			console.log(res);
			this.authorizeData = res;
		},
		async roleList() {
			const dataJson = {
				pageNum: this.pageIndex,
				pageSize: 10,
				roleName: '',
				...this.searchForm
			};
			const res = await roleListService(dataJson);
			console.log(res);
			this.total = res.total;
			this.tableData = res.records;
			this.isRefreshList = false;
		},
		showDialogAddHandler() {
			this.isShowAEDialog = true;
			this.selectData = [];
			this.$refs.tableDom.clearSelection();
			this.editId = -1;
		},
		showDialogEditHandler() {
			this.isShowAEDialog = true;
			this.$refs.tree.setCheckedKeys(this.selectData[0].powers);
			this.editId = this.selectData[0].id;
		},
		filterSelectIds() {
			return this.selectData.map(item => {
				return item.id;
			});
		},
		async showDeleteHandler() {
			const ids = this.filterSelectIds();
			const dataJson = {
				ids: ids
			};
			const res = await roleDeleteService(dataJson);
			console.log(res);
			this.isRefreshList = true;
		},
		editSingleHandler(row) {
			this.editId = row.id;
			this.selectData = [row];
			this.isShowAEDialog = true;
			this.$refs.tableDom.clearSelection();
		},
		deleteSingleHandler(row) {
			this.$confirm(this.delTips || '确认此操作吗？', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			})
				.then(async () => {
					this.selectData = [row];
					this.$refs.tableDom.clearSelection();
					this.showDeleteHandler();
				})
				.catch(error => {
					console.log(error);
				});
		},
		searchFormHandler(searchForm) {
			this.pageIndex = 1;
			this.searchForm = searchForm;
			this.roleList();
		},
		async saveMenu() {
			const checkedNodes = this.$refs.tree.getCheckedNodes();
			const lastNodesArr = this.lastNodes(checkedNodes);
			const ids = lastNodesArr.map(item => {
				return item.id;
			});
			const dataJson = {
				roleId: this.editId,
				powers: ids
			};
			const res = await roleAuthorizeService(dataJson);
			console.log(res);
		}
	}
};
</script>

<style>
</style>
