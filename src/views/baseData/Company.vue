<template>
	<div class="app-container">
		<!-- 搜索 -->
		<CompanySearchForm @searchForm="searchFormHandler"></CompanySearchForm>
		<!-- 顶部按钮 -->
		<Button
			@showDialogAdd="showDialogAddHandler"
			@showDialogEdit="showDialogEditHandler"
			@showDelete="showDeleteHandler"
			:selectData_p="selectData"
			:delTips_p="delTips"
			:authorize_p="'company'"
		></Button>
		<!--表格渲染-->
		<Table ref="tableDom" :data.sync="tableData" :tableColumn_p="tableColumn" :selectData_p.sync="selectData">
			<el-table-column label="操作" align="left" fixed="right">
				<template slot-scope="scope">
					<el-button id="btn-update-row" type="primary" v-authorize="{ name: 'update', type: 'company', id: 'btn-update-row' }" @click="editSingleHandler(scope.row)">
						编辑
					</el-button>
					<el-button id="btn-remove-row" type="danger" v-authorize="{ name: 'remove', type: 'company', id: 'btn-remove-row' }" @click="deleteSingleHandler(scope.row)">
						删除
					</el-button>
				</template>
			</el-table-column>
		</Table>
		<!-- 分页 -->
		<Pagination :total_p="total" :pageIndex_p.sync="pageIndex" :pageSize_p.sync="pageSize"></Pagination>
		<!-- AEForm -->
		<Dialog :title_p="AEDialogTitle" :visible_p.sync="isShowAEDialog">
			<CompanyAEForm v-if="isShowAEDialog" :isShowAEDialog_p.sync="isShowAEDialog" :isRefreshList_p.sync="isRefreshList" :selectData_p="selectData"></CompanyAEForm>
		</Dialog>
	</div>
</template>

<script>
import ListMixin from '@m/List.mixin';

import Dialog from '@c/ui/Dialog';
import Button from '@c/ui/Button';
import Table from '@c/ui/Table';
import Pagination from '@c/ui/Pagination';

import CompanyAEForm from '@f/baseData/company/CompanyAdd.form';
import CompanySearchForm from '@f/baseData/company/CompanySearch.form';

// eslint-disable-next-line import/no-cycle
import { companyListService, companyDeleteService, companyDetailService } from '@s/baseData/CompanyService';

export default {
	mixins: [ListMixin],
	components: {
		Table,
		Dialog,
		Pagination,
		Button,
		CompanyAEForm,
		CompanySearchForm
	},
	data() {
		return {
			// 表格
			tableColumn: [
				{
					label: '序号',
					field: 'id',
					columnWidth: 45
				},
				{
					label: '公司名称',
					field: 'name',
					columnWidth: 180
				},
				{
					type: 'link',
					isInlink: false, // 是否内链
					linkField: 'website', // 链接地址
					label: '官方网址',
					field: 'website'
				},
				{
					label: '邮箱',
					field: 'email'
				},
				{
					label: '联系电话',
					field: 'phone',
					columnWidth: '120'
				},
				{
					label: '地址详情',
					field: 'address'
				},
				{
					label: '创建时间',
					field: 'createDate',
					columnWidth: '140'
				},
				{
					label: '更新时间',
					field: 'updateDate',
					columnWidth: '140'
				},
				{
					type: 'image',
					label: 'LOGO',
					field: 'logo',
					columnWidth: 100,
					imageWidth: 55,
					imageHeight: 55
				},
				{
					type: 'image',
					label: '营业执照',
					field: 'businessLicense',
					columnWidth: '100',
					imageWidth: 55,
					imageHeight: 55
				}
			],
			delTips: ''
		};
	},

	computed: {
		AEDialogTitle() {
			return this.editId === -1 ? '新增公司' : '编辑公司';
		}
	},
	watch: {
		pageIndex(newValue) {
			this.pageIndex = newValue;
			this.companyList();
		},
		pageSize(newValue) {
			this.pageSize = newValue;
			this.companyList();
		},
		isRefreshList(newValue) {
			this.pageIndex = 1;
			if (newValue) {
				this.companyList();
			}
		}
	},
	mounted() {
		this.companyList();
	},
	methods: {
		async companyList() {
			const dataJson = {
				pageIndex: this.pageIndex,
				pageSize: this.pageSize,
				...this.searchForm
			};
			const res = await companyListService(dataJson);
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
			const res = await companyDetailService(dataJson);
			this.selectData = [res];
			this.showDialogEditHandlerMixin();
		},
		async showDeleteHandler() {
			const ids = this.filterSelectIdsMixin();
			const dataJson = {
				ids: ids
			};
			await companyDeleteService(dataJson);
			this.isRefreshList = true;
		},
		async editSingleHandler(row) {
			const dataJson = {
				id: row.id
			};
			const res = await companyDetailService(dataJson);
			this.editSingleHandlerMixin(res);
		},
		async deleteSingleHandler(row) {
			this.deleteSingleHandlerMixin(row);
		},
		searchFormHandler(searchForm) {
			this.searchFormHandlerMixin(searchForm);
			this.companyList();
		}
	}
};
</script>
<style lang='less' scoped>
</style>
