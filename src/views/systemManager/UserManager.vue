<template>
	<div class="app-container">
		<div class="head-container">
			<!-- 搜索区域 -->
			<UserSearchform @searchForm="searchFormHandler"></UserSearchform>
			<div>
				<!-- 功能按钮 -->
				<Button
					@showDialogAdd="showDialogAddHandler"
					@showDialogEdit="showDialogEditHandler"
					@showDelete="showisDeleteHandler"
					:selectData_p="selectData"
					:delTips_p="delTips"
				></Button>
			</div>
		</div>
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
		<Dialog :title="dialogTitle" :visible.sync="isShowAEDialog">
			<UserAddForm
				v-if="isShowAEDialog"
				:isShowAEDialog_p.sync="isShowAEDialog"
				:isRefreshList_p.sync="isRefreshList"
				:selectData_p="selectData"
			></UserAddForm>
		</Dialog>
	</div>
</template>

<script>
// eslint-disable-next-line import/no-cycle
import { userDeleteService, userListService } from '@s/system/UserService';
import Button from '@c/ui/Button';
import UserSearchform from '@f/system/UserSearch.form';
import Table from '@c/ui/Table';
import Pagination from '@c/ui/Pagination';
import Dialog from '@c/ui/Dialog';
import UserAddForm from '@f/system/UserAdd.form';

export default {
	components: {
		UserSearchform,
		Button,
		Table,
		Pagination,
		Dialog,
		UserAddForm
	},
	data() {
		return {
			// 分页
			total: 0,
			pageIndex: 1,
			pageSize: 10,
			// 表格
			tableColumn: [
				{
					label: '用户名',
					field: 'userName'
				},
				{
					label: '昵称',
					field: 'nickName'
				},
				{
					label: '角色',
					field: 'userRoles'
				},
				{
					label: '备注',
					field: 'remark'
				},
				{
					label: '创建时间',
					field: 'createDate'
				}
			],
			tableData: [],
			// 搜索
			searchForm: {},
			selectData: [],
			delTips: '',
			editId: -1,
			isShowAEDialog: false,
			isRefreshList: false
		};
	},
	computed: {
		dialogTitle() {
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
			console.log(newValue);
			if (newValue) {
				this.userList();
				this.pageIndex = 1;
			}
		}
	},
	mounted() {
		this.userList();
	},
	methods: {
		async userList() {
			const dataJson = {
				pageNum: this.pageIndex,
				pageSize: 10,
				userName: '',
				...this.searchForm
			};
			const res = await userListService(dataJson);
			console.log(res);
			this.total = res.total;
			this.tableData = res.records;
		},
		// 按钮组件广播显示添加框

		showDialogAddHandler() {
			this.isShowAEDialog = true;
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
		async showisDeleteHandler() {
			const ids = this.filterSelectIds();
			const dataJson = {
				ids: ids
			};
			await userDeleteService(dataJson);
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
				.then(() => {
					console.log(row);
				})
				.catch(error => {
					console.log(error);
				});
		},
		showDialogAdd() {
			this.dialogVisible = true;
		},
		showDialogEdit() {
			this.dialogVisible = true;
		},
		searchFormHandler(searchForm) {
			this.pageIndex = 1;
			this.searchForm = searchForm;
			this.userList();
		}
	}
};
</script>

<style lang="less" scoped>
</style>
