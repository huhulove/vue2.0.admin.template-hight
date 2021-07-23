<template>
	<div class="app-container">
		<!-- 搜索区域 -->
		<DeptSearchForm @searchForm="searchFormHandler"></DeptSearchForm>
		<!-- 顶部按钮 -->
		<Button
			@showDialogAdd="showDialogAddHandler"
			@showDialogEdit="showDialogEditHandler"
			@showDelete="showDeleteHandler"
			:selectData_p="selectData"
			:delTips_p="delTips"
			:authorize_p="'department'"
		></Button>
		<!--表格渲染-->
		<Table
			ref="tableDom"
			:data.sync="tableData"
			:tableColumn_p="tableColumn"
			:selectData_p.sync="selectData"
			row-key="id"
			:tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
		>
			<el-table-column label="操作" align="left" fixed="right">
				<template slot-scope="scope">
					<el-button id="btn-update-row" type="primary" v-authorize="{ name: 'update', type: 'department', id: 'btn-update-row' }" @click="editSingleHandler(scope.row)">
						编辑
					</el-button>
					<el-button id="btn-remove-row" type="danger" v-authorize="{ name: 'remove', type: 'department', id: 'btn-remove-row' }" @click="deleteSingleHandler(scope.row)">
						删除
					</el-button>
				</template>
			</el-table-column>
		</Table>
		<!-- 分页 -->
		<Pagination :total_p="total" :pageIndex_p.sync="pageIndex" :pageSize_p.sync="pageSize"></Pagination>
		<!-- AEForm -->
		<Dialog :title_p="AEDialogTitle" :visible_p.sync="isShowAEDialog">
			<DepartmentAEForm v-if="isShowAEDialog" :isShowAEDialog_p.sync="isShowAEDialog" :isRefreshList_p.sync="isRefreshList" :selectData_p="selectData"></DepartmentAEForm>
		</Dialog>
	</div>
</template>

<script>
import ListMixin from '@m/List.mixin';

import Dialog from '@c/ui/Dialog';
import Button from '@c/ui/Button';
import Table from '@c/ui/Table';
import Pagination from '@c/ui/Pagination';

import DepartmentAEForm from '@f/systemManager/department/DepartmentAdd.form';
import DeptSearchForm from '@f/systemManager/department/DepartmentSearch.form';

// eslint-disable-next-line import/no-cycle
import { departmentListService, departmentDeleteService, departmentDetailService } from '@s/systemManager/DepartmentService';

export default {
	mixins: [ListMixin],
	components: {
		Table,
		Dialog,
		Pagination,
		Button,
		DepartmentAEForm,
		DeptSearchForm
	},
	data() {
		return {
			// 表格
			tableColumn: [
				{
					label: '部门',
					field: 'name'
				},
				{
					label: '序号',
					field: 'id',
					columnWidth: 55
				},
				{
					label: '负责人姓名',
					field: 'dutyPeople.name'
				},
				{
					label: '企业',
					field: 'company.name'
				},
				{
					label: '添加日期',
					field: 'createDate',
					type: 'date'
				},
				{
					label: '更新日期',
					field: 'updateDate',
					type: 'date'
				}
			],
			delTips: ''
		};
	},
	computed: {
		AEDialogTitle() {
			return this.editId === -1 ? '新增部门' : '编辑部门';
		}
	},
	watch: {
		pageIndex(newValue) {
			this.pageIndex = newValue;
			this.departmentList();
		},
		pageSize(newValue) {
			this.pageSize = newValue;
			this.departmentList();
		},
		isRefreshList(newValue) {
			this.pageIndex = 1;
			if (newValue) {
				this.departmentList();
			}
		}
	},
	mounted() {
		this.departmentList();
	},
	methods: {
		async departmentList() {
			const dataJson = {
				pageIndex: this.pageIndex,
				pageSize: this.pageSize,
				...this.searchForm
			};
			const res = await departmentListService(dataJson);
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
			const res = await departmentDetailService(dataJson);
			this.selectData = [res];
		},
		async showDeleteHandler() {
			const ids = this.filterSelectIdsMixin();
			const dataJson = {
				ids: ids
			};
			await departmentDeleteService(dataJson);
			this.isRefreshList = true;
		},
		async editSingleHandler(row) {
			const dataJson = {
				id: row.id
			};
			const res = await departmentDetailService(dataJson);
			this.editSingleHandlerMixin(res);
		},
		async deleteSingleHandler(row) {
			this.deleteSingleHandlerMixin(row);
		},
		searchFormHandler(searchForm) {
			this.searchFormHandlerMixin(searchForm);
			this.departmentList();
		}
	}
};
</script>
<style lang='less' scoped>
</style>
