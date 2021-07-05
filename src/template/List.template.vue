<template>
	<div class="app-container">
		<SearchForm @searchForm="searchFormHandler"></SearchForm>
		<Button
			@showDialogAdd="showDialogAddHandler"
			@showDialogEdit="showDialogEditHandler"
			@showDelete="showDeleteHandler"
			:selectData_p="selectData"
			:delTips_p="delTips"
			:authorize_p="'equipment'"
		></Button>
		<!--表格渲染-->
		<Table ref="tableDom" :data.sync="tableData" :tableColumn_p="tableColumn" :selectData_p.sync="selectData">
			<el-table-column label="创建时间" width="150">
				<template slot-scope="scope">
					{{ scope.row.createDate | formatDate }}
				</template>
			</el-table-column>
			<el-table-column label="状态" width="60px;">
				<template slot-scope="scope">
					{{ scope.row.isDel === 0 ? '正常' : '禁用' }}
				</template>
			</el-table-column>
			<el-table-column label="操作" align="left" fixed="right">
				<template slot-scope="scope">
					<el-button
						id="btn-update-row"
						type="primary"
						v-authorize="{ name: 'update', type: 'equipment', id: 'btn-update-row' }"
						@click="editSingleHandler(scope.row)"
					>
						编辑
					</el-button>
					<el-button
						id="btn-remove-row"
						type="danger"
						v-authorize="{ name: 'remove', type: 'equipment', id: 'btn-remove-row' }"
						@click="deleteSingleHandler(scope.row)"
					>
						删除
					</el-button>
				</template>
			</el-table-column>
		</Table>
		<Pagination :total="total" :pageIndex_p.sync="pageIndex" :pageSize_p.sync="pageSize"></Pagination>
		<Dialog :title="dialogTitle" :visible.sync="isShowAEDialog">
			<AEForm
				v-if="isShowAEDialog"
				:isShowAEDialog_p.sync="isShowAEDialog"
				:isRefreshList_p.sync="isRefreshList"
				:isRefreshListAll_p.sync="isRefreshListAll"
				:selectData_p="selectData"
				:editId_p="editId"
			></AEForm>
		</Dialog>
	</div>
</template>

<script>
import Dialog from '@c/ui/Dialog';
import Button from '@c/ui/Button';
import Table from '@c/ui/Table';
import Pagination from '@c/ui/Pagination';
import ListMixin from '@m/List.mixin';

// eslint-disable-next-line import/no-cycle
import { listService, deleteService, detailService } from './Service.template';
import AEForm from './AEForm.template';
import SearchForm from './SearchForm.template';

export default {
	mixins: [ListMixin],
	components: {
		Table,
		Dialog,
		Pagination,
		Button,
		AEForm,
		SearchForm
	},
	data() {
		return {
			// 表格
			tableColumn: [
				{
					label: '名称',
					field: 'equipment',
					width: '200px'
				},
				{
					label: '主要耗能',
					field: 'energyName'
				},
				{
					label: '开机耗能',
					field: 'electricityAfter'
				},
				{
					label: '待机耗能',
					field: 'electricityFront'
				},
				{
					label: '设备类型',
					field: 'codeName'
				},
				{
					label: '生产工艺',
					field: 'processName'
				}
			],
			delTips: ''
		};
	},
	computed: {
		dialogTitle() {
			return this.editId === -1 ? '新增列表模板' : '编辑列表模板';
		}
	},
	watch: {
		pageIndex(newValue) {
			this.pageIndex = newValue;
			this.list();
		},
		pageSize(newValue) {
			this.pageSize = newValue;
			this.list();
		},
		isRefreshList(newValue) {
			if (newValue) {
				this.list();
			}
		},
		isRefreshListAll(newValue) {
			if (newValue) {
				if (this.pageIndex === 1) {
					this.list();
				} else {
					this.pageIndex = 1;
				}
			}
		}
	},
	mounted() {
		this.list();
	},
	methods: {
		async list() {
			const dataJson = {
				pageNum: this.pageIndex,
				pageSize: this.pageSize,
				...this.searchForm
			};
			const res = await listService(dataJson);
			this.listMixin(res);
		},
		showDialogAddHandler() {
			this.dialogAddHandlerMixin();
		},
		async showDialogEditHandler() {
			const editId = this.dialogEditHandlerMixin();
			const dataJson = {
				problemId: editId
			};
			const res = await detailService(dataJson);
			this.selectData = [res];
			this.isShowAEDialog = true;
		},
		async showDeleteHandler() {
			const ids = this.filterSelectIdsMixin();
			const dataJson = {
				equipmentId: ids
			};
			await deleteService(dataJson);
			this.isRefreshList = true;
		},
		async editSingleHandler(row) {
			const dataJson = {
				menuId: row.id
			};
			const res = await detailService(dataJson);
			this.editSingleHandlerMixin(res);
		},
		async deleteSingleHandler(row) {
			this.deleteSingleHandlerMixin(row);
		},
		searchFormHandler(searchForm) {
			this.searchFormHandlerMixin(searchForm);
			this.list();
		}
	}
};
</script>
<style lang='less' scoped>
</style>
