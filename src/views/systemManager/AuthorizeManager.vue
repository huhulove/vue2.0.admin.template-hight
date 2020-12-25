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
					:authorize_p="'power'"
				></Button>
			</div>
		</div>
		<!--表格渲染-->
		<Table
			ref="tableDom"
			:data.sync="tableData"
			:tableColumn_p="tableColumn"
			:selectData_p.sync="selectData"
			row-key="powerCode"
			:tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
		>
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
						v-authorize="{ name: 'update', type: 'power', id: 'btn-update-row' }"
						@click="editSingleHandler(scope.row)"
					></el-button>
					<el-button
						id="btn-remove-row"
						type="danger"
						icon="el-icon-delete"
						v-authorize="{ name: 'remove', type: 'power', id: 'btn-remove-row' }"
						@click="deleteSingleHandler(scope.row)"
					></el-button>
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
import { authorizeListService, authorizeDeleteService, authorizeDetailService } from '@s/system/AuthorizeService';
import Button from '@c/ui/Button';
import Table from '@c/ui/Table';
import Dialog from '@c/ui/Dialog';
import AuthorizeAddForm from '@f/system//authorize/AuthorizeAdd.form';
/* import AuthorizeSearchForm from '@f/system/AuthorizeSearch.form'; */
import ListMixin from '@m/List.mixin';

export default {
	mixins: [ListMixin],
	components: {
		Table,
		Button,
		Dialog,
		AuthorizeAddForm
		/* AuthorizeSearchForm */
	},
	data() {
		return {
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
					label: '备注',
					field: 'remark'
				}
			],
			delTips: ''
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
				menuJurisdictions: ids
			};
			console.log(dataJson);
			await authorizeDeleteService(dataJson);
			this.isRefreshList = true;
		},
		async editSingleHandler(row) {
			const dataJson = {
				powerCode: row.powerCode
			};
			const res = await authorizeDetailService(dataJson);
			console.log(res);
			/* this.editSingleHandlerMixin(res); */
		},
		deleteSingleHandler(row) {
			this.deleteSingleHandlerMixin(row);
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
