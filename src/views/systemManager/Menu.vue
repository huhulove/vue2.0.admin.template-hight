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
			<el-col :xs="24" :sm="24" :md="16" :lg="16" :xl="18">
				<Card>
					<div slot="header" class="clearfix">
						<span class="role-span">菜单列表</span>
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
						<el-table-column label="状态" width="70">
							<template slot-scope="scope">
								{{ scope.row.status === 0 ? '正常' : '禁用' }}
							</template>
						</el-table-column>
						<el-table-column label="操作" align="left" fixed="right" width="300">
							<template slot-scope="scope">
								<el-button
									id="btn-update-row"
									type="primary"
									v-authorize="{ name: 'update', type: 'menu', id: 'btn-update-row' }"
									@click="editSingleHandler(scope.row)"
								>
									编辑
								</el-button>
								<el-button
									id="btn-remove-row"
									type="danger"
									v-authorize="{ name: 'remove', type: 'menu', id: 'btn-remove-row' }"
									@click="deleteSingleHandler(scope.row)"
								>
									删除
								</el-button>
								<el-button
									id="btn-remove-row"
									type="success"
									v-authorize="{ name: 'menuJurisdictionsConfigure', type: 'menu', id: 'btn-remove-row' }"
									@click="setAuthorizeHandler(scope.row)"
								>
									设置权限
								</el-button>
							</template>
						</el-table-column>
					</Table>
				</Card>
			</el-col>
			<!-- 菜单授权 -->
			<el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="6">
				<Card>
					<div slot="header" class="clearfix">
						<el-tooltip class="item" effect="dark" content="选择指定菜单分配权限" placement="top">
							<span class="role-span">权限分配</span>
						</el-tooltip>
						<el-button :disabled="editId === -1" icon="el-icon-check" size="mini" style="float: right; padding: 6px 9px" type="primary" @click="saveMenu">
							保存
						</el-button>
					</div>
					<AuthorizeTree ref="authorizeTreeEle" :hasPowerCodes_p="hasPowerCodes"></AuthorizeTree>
				</Card>
			</el-col>
		</el-row>
		<!-- AEForm -->
		<Dialog :title_p="AEDialogTitle" :visible_p.sync="isShowAEDialog">
			<MenuAEForm v-if="isShowAEDialog" :isShowAEDialog_p.sync="isShowAEDialog" :isRefreshList_p.sync="isRefreshList" :selectData_p="selectData"></MenuAEForm>
		</Dialog>
	</div>
</template>

<script>
import ListMixin from '@m/List.mixin';
// eslint-disable-next-line import/no-cycle
import { changePowerToEdit } from '@u/index';

import Table from '@c/ui/Table';
import Button from '@c/ui/Button';
import Dialog from '@c/ui/Dialog';
import Card from '@c/ui/Card';

import MenuAEForm from '@f/systemManager/menu/MenuAdd.form';
import AuthorizeTree from '@f/layout/AuthorizeTree';

// eslint-disable-next-line import/no-cycle
import { menuListService, menuDeleteService, menuAuthorizeService, menuDetailService } from '@s/systemManager/MenuService';
// eslint-disable-next-line import/no-cycle
import { authorizeListService } from '@s/systemManager/AuthorizeService';

export default {
	mixins: [ListMixin],
	components: {
		Table,
		Button,
		Dialog,
		Card,
		MenuAEForm,
		AuthorizeTree
	},
	data() {
		return {
			// 表格
			tableColumn: [
				{
					label: '菜单名称',
					field: 'menuName',
					columnWidth: 200
				},
				{
					label: 'id',
					field: 'id',
					columnWidth: 55
				},
				{
					label: '排序',
					field: 'menuSort',
					columnWidth: '70'
				},
				{
					label: 'url地址',
					field: 'url',
					columnWidth: '240'
				},
				{
					label: '路由名称',
					field: 'routeName'
				},
				{
					label: '图标',
					field: 'menuIcon',
					type: 'icon'
				}
			],
			delTips: '',
			hasPowerCodes: null
		};
	},
	computed: {
		AEDialogTitle() {
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
			changePowerToEdit(this.authorizeData, this.$envConfig);
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
				id: editId
			};
			const res = await menuDetailService(dataJson);
			this.selectData = [res];
			this.setAuthorizeHandler(res);
		},
		async showDeleteHandler() {
			const ids = this.filterSelectIdsMixin();
			const dataJson = {
				ids: ids
			};
			await menuDeleteService(dataJson);
			this.isRefreshList = true;
		},
		async editSingleHandler(row) {
			const res = await this.menuDetail(row);
			this.editSingleHandlerMixin(res);
			this.setAuthorizeHandler(res);
		},
		deleteSingleHandler(row) {
			this.deleteSingleHandlerMixin(row);
		},
		async setAuthorizeHandler(row) {
			const res = await this.menuDetail(row);
			this.hasPowerCodes = res.powers;
		},
		async menuDetail(row) {
			const dataJson = {
				id: row.id
			};
			this.editId = row.id;
			const res = await menuDetailService(dataJson);
			return res;
		},
		async saveMenu() {
			const checkedNodes = this.$refs.tree.getCheckedNodes();
			const halfCheckedNodes = this.$refs.tree.getHalfCheckedNodes();
			const ids = checkedNodes.map(item => {
				return item.powerCode;
			});

			const ids1 = halfCheckedNodes.map(item => {
				return item.powerCode;
			});

			const dataJson = {
				id: this.editId,
				menuJurisdictions: Array.from(new Set([...ids, ...ids1]))
			};
			await menuAuthorizeService(dataJson);
			this.$store.commit('setRefreshAside', true);
		}
	}
};
</script>

<style>
</style>
