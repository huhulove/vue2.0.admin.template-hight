<template>
	<div class="app-container">
		<!-- 搜索区域 -->
		<AuthorizeSearchForm @searchForm="searchFormHandler"></AuthorizeSearchForm>
		<!-- 顶部按钮 -->
		<ButtonGroup
			@showDialogAdd="showDialogAddHandler"
			@showDialogEdit="showDialogEditHandler"
			@showDelete="showDeleteHandler"
			:selectData_p="selectData"
			:delTips_p="delTips"
			:authorize_p="'power'"
		></ButtonGroup>
		<!--表格渲染-->
		<Table
			ref="tableDom"
			:data.sync="tableData"
			:tableColumn_p="tableColumn"
			:selectData_p.sync="selectData"
			row-key="powerCode"
			:tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
		>
			<el-table-column label="状态" width="100">
				<template slot-scope="scope">{{ scope.row.status === 0 ? '正常' : '禁用' }}</template>
			</el-table-column>
			<el-table-column label="操作" align="left" fixed="right" width="180">
				<template slot-scope="scope">
					<EditRowButton v-authorize="{ name: 'update', type: 'power', id: 'btn-update-row' }" @click="editSingleHandler(scope.row)"></EditRowButton>
					<RemoveRowButton v-authorize="{ name: 'remove', type: 'power', id: 'btn-remove-row' }" @click="deleteSingleHandler(scope.row)"></RemoveRowButton>
				</template>
			</el-table-column>
		</Table>
		<!-- AEForm -->
		<Dialog :title_p="AEDialogTitle" :visible_p.sync="isShowAEDialog">
			<AuthorizeAEForm v-if="isShowAEDialog" :isShowAEDialog_p.sync="isShowAEDialog" :isRefreshList_p.sync="isRefreshList" :selectData_p="selectData"></AuthorizeAEForm>
		</Dialog>
	</div>
</template>

<script>
import ListMixin from '@m/List.mixin';

import ButtonGroup from '@c/custom/ButtonGroup';
import Table from '@c/ui/Table';
import Dialog from '@c/ui/Dialog';
import EditRowButton from '@c/ui/Button/editRow';
import RemoveRowButton from '@c/ui/Button/removeRow';

import AuthorizeAEForm from '@f/systemManager/authorize/AuthorizeAdd.form';
import AuthorizeSearchForm from '@f/systemManager/authorize/AuthorizeSearch.form';

// eslint-disable-next-line import/no-cycle
import { authorizeListService, authorizeDeleteService, authorizeDetailService } from '@s/systemManager/AuthorizeService';

export default {
	mixins: [ListMixin],
	components: {
		Table,
		ButtonGroup,
		Dialog,
		EditRowButton,
		RemoveRowButton,
		AuthorizeAEForm,
		AuthorizeSearchForm
	},
	data() {
		return {
			// 表格
			tableColumn: [
				{
					label: '权限名称',
					field: 'powerName',
					columnWidth: '140'
				},
				{
					label: '排序',
					field: 'powerSort',
					columnWidth: '100'
				},
				{
					label: '权限标识',
					field: 'powerCode',
					columnWidth: '220'
				},
				{
					label: '创建时间',
					field: 'createDate',
					type: 'date',
					columnWidth: '200'
				},
				{
					label: '更新时间',
					field: 'updateDate',
					type: 'date',
					columnWidth: '200'
				},
				{
					label: '备注',
					field: 'remark',
					columnWidth: '300'
				}
			],
			delTips: ''
		};
	},
	computed: {
		AEDialogTitle() {
			return this.editId === -1 ? '新增权限' : '编辑权限';
		}
	},
	watch: {
		isRefreshList(newValue) {
			if (newValue) {
				this.authorizeList();
			}
		}
	},
	mounted() {
		this.authorizeList();
	},
	methods: {
		async authorizeList() {
			const dataJson = {
				...this.searchForm
			};
			const res = await authorizeListService(dataJson);
			this.listMixin(res);
		},
		showDialogAddHandler() {
			this.dialogAddHandlerMixin();
			this.$refs.tableDom.clearSelection();
		},
		async showDialogEditHandler() {
			const editId = this.dialogEditHandlerMixin();
			const dataJson = {
				powerCode: editId
			};
			const res = await authorizeDetailService(dataJson);
			this.selectData = [res];
		},
		async showDeleteHandler() {
			const ids = this.filterSelectIdsMixin();
			const dataJson = {
				powerCode: ids
			};
			await authorizeDeleteService(dataJson);
			this.isRefreshList = true;
		},
		async editSingleHandler(row) {
			const dataJson = {
				powerCode: row.powerCode
			};
			const res = await authorizeDetailService(dataJson);
			this.editSingleHandlerMixin(res);
		},
		deleteSingleHandler(row) {
			this.deleteSingleHandlerMixin(row);
		},
		searchFormHandler(searchForm) {
			this.searchFormHandlerMixin(searchForm);
			this.authorizeList();
		}
	}
};
</script>

<style scoped>
</style>
