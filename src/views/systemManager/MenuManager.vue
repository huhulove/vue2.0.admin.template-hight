<template>
	<div class="app-container">
		<el-row :gutter="15">
			<Button
				@showDialogAdd="showDialogAddHandler"
				@showDialogEdit="showDialogEditHandler"
				@showDelete="showDeleteHandler"
				:selectData_p="selectData"
				:delTips_p="delTips"
			></Button>
			<el-col :xs="24" :sm="24" :md="16" :lg="16" :xl="17" style="margin-bottom: 10px">
				<el-card class="box-card" shadow="never">
					<div slot="header" class="clearfix">
						<span class="role-span">菜单列表</span>
					</div>
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
					<!--分页组件-->
				</el-card>
			</el-col>
			<!-- 菜单授权 -->
			<el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="7">
				<el-card class="box-card" shadow="never">
					<div slot="header" class="clearfix">
						<el-tooltip class="item" effect="dark" content="选择指定菜单分配权限" placement="top">
							<span class="role-span">权限分配</span>
						</el-tooltip>
						<el-button icon="el-icon-check" size="mini" style="float: right; padding: 6px 9px" type="primary" @click="saveMenu">保存</el-button>
					</div>
					<el-tree ref="tree" :props="defaultProps" :data="authorizeData" node-key="id" show-checkbox></el-tree>
				</el-card>
			</el-col>
		</el-row>
		<Dialog :title="dialogTitle" :visible.sync="isShowAEDialog">
			<MenuAddForm
				v-if="isShowAEDialog"
				:isShowAEDialog_p.sync="isShowAEDialog"
				:isRefreshList_p.sync="isRefreshList"
				:selectData_p="selectData"
			></MenuAddForm>
		</Dialog>
	</div>
</template>

<script>
// eslint-disable-next-line import/no-cycle
import { menuListService, menuDeleteService, menuAuthorizeService } from '@s/system/MenuService';
// eslint-disable-next-line import/no-cycle
import { authorizeListService } from '@s/system/AuthorizeService';
import Table from '@c/ui/Table.vue';
import Button from '@c/ui/Button.vue';
import Dialog from '@c/ui/Dialog.vue';
import MenuAddForm from '@f/system/MenuAdd.form';

export default {
	components: {
		Table,
		Button,
		Dialog,
		MenuAddForm
	},
	data() {
		return {
			// 表格
			tableColumn: [
				{
					label: '菜单名称',
					field: 'menuName'
				},
				{
					label: '排序',
					field: 'menuSort'
				},
				{
					label: 'url地址',
					field: 'url'
				},
				{
					label: '路由名称',
					field: 'routeName'
				},
				{
					label: '图标',
					field: 'menuIcon'
				}
			],
			tableData: [],
			selectData: [],

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
			return this.editId === -1 ? '新增菜单' : '编辑菜单';
		}
	},
	watch: {
		isRefreshList(newValue) {
			if (newValue) {
				this.menuList();
			}
		}
	},
	mounted() {
		this.authorizeList();
		this.menuList();
	},
	methods: {
		async authorizeList() {
			const dataJson = {};
			const res = await authorizeListService(dataJson);
			console.log(res);
			this.authorizeData = res;
		},
		async menuList() {
			const dataJson = {};
			const res = await menuListService(dataJson);
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
				menuList: ids
			};
			await menuDeleteService(dataJson);
			this.isRefreshList = true;
		},
		editSingleHandler(row) {
			this.editId = row.id;
			this.selectData = [row];
			this.$refs.tree.setCheckedKeys(this.selectData[0].powers);
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
		lastNodes(nodeArr) {
			return nodeArr.filter(item => {
				return !item.children;
			});
		},
		async saveMenu() {
			const checkedNodes = this.$refs.tree.getCheckedNodes();
			const lastNodesArr = this.lastNodes(checkedNodes);
			const ids = lastNodesArr.map(item => {
				return item.id;
			});
			const dataJson = {
				id: this.editId,
				menuJurisdictions: ids
			};
			const res = await menuAuthorizeService(dataJson);
			console.log(res);
		}
	}
};
</script>

<style>
</style>
