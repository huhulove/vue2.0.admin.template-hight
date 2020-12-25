<template>
	<div class="app-container">
		<el-row :gutter="15">
			<Button
				@showDialogAdd="showDialogAddHandler"
				@showDialogEdit="showDialogEditHandler"
				@showDelete="showDeleteHandler"
				:selectData_p="selectData"
				:delTips_p="delTips"
				:authorize_p="'menu'"
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
								<el-button
									id="btn-update-row"
									type="primary"
									icon="el-icon-edit"
									v-authorize="{ name: 'update', type: 'menu', id: 'btn-update-row' }"
									@click="editSingleHandler(scope.row)"
								></el-button>
								<el-button
									id="btn-remove-row"
									type="danger"
									icon="el-icon-delete"
									v-authorize="{ name: 'remove', type: 'menu', id: 'btn-remove-row' }"
									@click="deleteSingleHandler(scope.row)"
								></el-button>
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
					<el-tree ref="tree" :props="defaultProps" :data="authorizeData" node-key="powerCode" show-checkbox></el-tree>
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
import { menuListService, menuDeleteService, menuAuthorizeService, menuDetailService } from '@s/system/MenuService';
// eslint-disable-next-line import/no-cycle
import { authorizeListService } from '@s/system/AuthorizeService';
import Table from '@c/ui/Table.vue';
import Button from '@c/ui/Button.vue';
import Dialog from '@c/ui/Dialog.vue';
import MenuAddForm from '@f/system/menu/MenuAdd.form';
import ListMixin from '@m/List.mixin';

export default {
	mixins: [ListMixin],
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
			delTips: '',
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
			this.authorizeData = res;
		},
		async menuList() {
			const dataJson = {};
			const res = await menuListService(dataJson);
			this.listMixin(res);
		},
		showDialogAddHandler() {
			this.dialogAddHandlerMixin();
			this.$refs.tableDom.clearSelection();
		},
		async showDialogEditHandler() {
			const editId = this.dialogEditHandlerMixin();
			const dataJson = {
				menuId: editId
			};
			const res = await menuDetailService(dataJson);
			this.selectData = [res];
			this.$refs.tree.setCheckedKeys(this.selectData[0].powers);
		},
		async showDeleteHandler() {
			const ids = this.filterSelectIdsMixin();
			const dataJson = {
				menuList: ids
			};
			await menuDeleteService(dataJson);
			this.isRefreshList = true;
		},
		async editSingleHandler(row) {
			const dataJson = {
				menuId: row.id
			};
			const res = await menuDetailService(dataJson);
			this.editSingleHandlerMixin(res);
			this.$refs.tree.setCheckedKeys(this.selectData[0].powers);
		},
		deleteSingleHandler(row) {
			this.deleteSingleHandlerMixin(row);
		},
		async saveMenu() {
			const checkedNodes = this.$refs.tree.getCheckedNodes();
			const lastNodesArr = this.lastNodesMixin(checkedNodes);
			const ids = lastNodesArr.map(item => {
				return item.powerCode;
			});
			const dataJson = {
				id: this.editId,
				menuJurisdictions: ids
			};
			await menuAuthorizeService(dataJson);
			this.$store.commit('setRefreshAside', true);
		}
	}
};
</script>

<style>
</style>
