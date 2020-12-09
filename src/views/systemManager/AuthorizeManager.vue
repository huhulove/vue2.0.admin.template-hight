<template>
	<div class="app-container">
		<div class="head-container">
			<!-- <AuthorizeSearchForm @searchForm="searchFormHandler"></AuthorizeSearchForm> -->
			<div>
				<!-- 功能按钮 -->
				<Button
					@showDialogAdd="showDialogAddHandler"
					@showDialogEdit="showDialogEditHandler"
					@showDelete="showDeleteHandler"
					:selectData_p="selectData"
					:delTips_p="delTips"
				></Button>
			</div>
		</div>
		<!--表格渲染-->
		<Table
			ref="tableDom"
			:data.sync="tableData"
			:tableColumn_p="tableColumn"
			:selectData_p.sync="selectData"
			row-key="id"
			:tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
		>
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
		<Dialog :title="dialogTitle" :visible.sync="isShowAEDialog">
			<AuthorizeAddForm
				v-if="isShowAEDialog"
				:isShowAEDialog_p.sync="isShowAEDialog"
				:isRefreshList_p.sync="isRefreshList"
				:selectData_p="selectData"
			></AuthorizeAddForm>
		</Dialog>
	</div>
</template>

<script>
// eslint-disable-next-line import/no-cycle
import { authorizeListService, authorizeDeleteService } from '@s/system/AuthorizeService';
import Button from '@c/ui/Button';
import Table from '@c/ui/Table';
import Dialog from '@c/ui/Dialog';
import AuthorizeAddForm from '@f/system/AuthorizeAdd.form';
/* import AuthorizeSearchForm from '@f/system/AuthorizeSearch.form'; */

export default {
	components: {
		Table,
		Button,
		Dialog,
		AuthorizeAddForm
		/* AuthorizeSearchForm */
	},
	data() {
		return {
			// 分页
			/* total: 1,
			pageIndex: 1,
			pageSize: 10, */
			// 表格
			tableColumn: [
				{
					label: '权限名称',
					field: 'powerName'
				},
				{
					label: '权限标识',
					field: 'powerCode'
				},
				{
					label: '创建时间',
					field: 'createDate'
				},
				{
					label: '更新时间',
					field: 'updateDate'
				},
				{
					label: '备注',
					field: 'remark'
				}
			],
			tableData: [],
			selectData: [],
			// 搜索
			/* searchForm: {}, */
			delTips: '',
			editId: -1,
			isShowAEDialog: false,
			isRefreshList: false
		};
	},
	computed: {
		dialogTitle() {
			return this.editId === -1 ? '新增权限' : '编辑权限';
		}
	},
	watch: {
		isRefreshList(newValue) {
			console.log(newValue);
			if (newValue) {
				this.authorizeList();
				/* this.pageIndex = 1; */
			}
		}
	},
	mounted() {
		this.authorizeList();
	},
	methods: {
		async authorizeList() {
			const dataJson = {
				/* ...this.searchForm */
			};
			const res = await authorizeListService(dataJson);
			console.log(res);
			this.tableData = res;
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
				menuJurisdictions: ids
			};
			await authorizeDeleteService(dataJson);
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
		}
		/* searchFormHandler(searchForm) {
			this.pageIndex = 1;
			this.searchForm = searchForm;
			this.authorizeList();
		} */
	}
};
</script>

<style scoped>
</style>
