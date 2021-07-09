<template>
	<div class="app-container">
		<el-row :gutter="15">
			<!-- 功能按钮 -->
			<Button
				@showDialogAdd="showDialogAddHandler"
				@showDialogEdit="showDialogEditHandler"
				@showDelete="showDeleteHandler"
				:selectData_p="selectData"
				:delTips_p="delTips"
				:authorize_p="'role'"
			></Button>
			<el-col :xs="24" :sm="24" :md="16" :lg="16" :xl="18">
				<Card>
					<div slot="header" class="clearfix">
						<span class="role-span">角色列表</span>
					</div>
					<!-- 搜索区域 -->
					<RoleSearchForm @searchForm="searchFormHandler"></RoleSearchForm>
					<!--表格渲染-->
					<Table ref="tableDom" :data.sync="tableData" :tableColumn_p="tableColumn" :selectData_p.sync="selectData">
						<el-table-column label="状态" width="70">
							<template slot-scope="scope">{{ scope.row.status === 0 ? '正常' : '禁用' }}</template>
						</el-table-column>
						<el-table-column label="操作" align="left" fixed="right" width="300">
							<template slot-scope="scope">
								<el-button
									id="btn-update-row"
									type="primary"
									v-authorize="{ name: 'update', type: 'role', id: 'btn-update-row' }"
									@click="editSingleHandler(scope.row)"
								>
									编辑
								</el-button>
								<el-button
									id="btn-remove-row"
									type="danger"
									v-authorize="{ name: 'remove', type: 'role', id: 'btn-remove-row' }"
									@click="deleteSingleHandler(scope.row)"
								>
									删除
								</el-button>
								<el-button
									id="btn-remove-row"
									type="success"
									v-authorize="{ name: 'rolePowerConf', type: 'role', id: 'btn-remove-row' }"
									@click="setAuthorizeHandler(scope.row)"
								>
									设置权限
								</el-button>
							</template>
						</el-table-column>
					</Table>
					<!-- 分页 -->
					<Pagination :total="total" :pageIndex_p.sync="pageIndex" :pageSize_p.sync="pageSize"></Pagination>
				</Card>
			</el-col>
			<!-- 角色授权 -->
			<el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="6">
				<Card>
					<div slot="header" class="clearfix">
						<el-tooltip class="item" effect="dark" content="选择指定角色分配权限" placement="top">
							<span class="role-span">权限分配</span>
						</el-tooltip>
						<el-button :disabled="editId === -1" icon="el-icon-check" size="mini" style="float: right; padding: 6px 9px" type="primary" @click="saveMenu">
							保存
						</el-button>
					</div>
					<el-alert title="单击父节点名称可选中全部子节点" type="warning" style="margin-bottom: 10px" :closable="false"></el-alert>
					<el-tree
						ref="tree"
						:props="defaultProps"
						:data="authorizeData"
						node-key="powerCode"
						show-checkbox
						:check-strictly="true"
						:expand-on-click-node="false"
						@check="checkChange"
					></el-tree>
				</Card>
			</el-col>
		</el-row>
		<Dialog :title="AEDialogTitle" :visible.sync="isShowAEDialog">
			<RoleAddForm v-if="isShowAEDialog" :isShowAEDialog_p.sync="isShowAEDialog" :isRefreshList_p.sync="isRefreshList" :selectData_p="selectData"></RoleAddForm>
		</Dialog>
	</div>
</template>

<script>
import { hgetStorage } from '@u/htools.web';
import ListMixin from '@m/List.mixin';
import { getTreeNodeById } from '@u/htools.tree.js';
// eslint-disable-next-line import/no-cycle
import { changePowerToEdit } from '@u/index';

import Button from '@c/ui/Button';
import Table from '@c/ui/Table';
import Pagination from '@c/ui/Pagination';
import Dialog from '@c/ui/Dialog';
import Card from '@c/ui/Card';

import RoleAddForm from '@f/system/role/RoleAdd.form';
import RoleSearchForm from '@f/system/role/RoleSearch.form';

// eslint-disable-next-line import/no-cycle
import { roleDeleteService, roleListService, roleAuthorizeService, roleDetailService } from '@s/system/RoleService';
// eslint-disable-next-line import/no-cycle
import { authorizeListService } from '@s/system/AuthorizeService';

export default {
	mixins: [ListMixin],
	components: {
		Table,
		Pagination,
		Button,
		Dialog,
		Card,
		RoleAddForm,
		RoleSearchForm
	},
	data() {
		const tableColumn = [
			{
				label: '序号',
				field: 'id',
				columnWidth: 55
			},
			{
				label: '角色名称',
				field: 'name',
				columnWidth: 100
			},
			{
				label: '描述',
				field: 'remark'
			},
			{
				label: '创建日期',
				field: 'createDate',
				type: 'date'
			},
			{
				label: '更新日期',
				filed: 'updateDate',
				type: 'date'
			}
		];
		const companyId = hgetStorage('companyId');
		if (companyId === 0) {
			tableColumn.splice(4, 0, {
				label: '企业',
				field: 'company.name',
				columnWidth: 100
			});
		}
		return {
			// 表格
			tableColumn: tableColumn,
			delTips: '',
			authorizeData: [],
			defaultProps: { children: 'children', label: 'powerName' }
		};
	},
	computed: {
		AEDialogTitle() {
			return this.editId === -1 ? '新增角色' : '编辑角色';
		}
	},
	watch: {
		pageIndex(newValue) {
			this.pageIndex = newValue;
			this.roleList();
		},
		pageSize(newValue) {
			this.pageSize = newValue;
			this.roleList();
		},
		isRefreshList(newValue) {
			this.pageIndex = 1;
			if (newValue) {
				this.roleList();
			}
		}
	},
	mounted() {
		this.authorizeList();
		this.roleList();
	},
	methods: {
		async authorizeList() {
			const dataJson = {};
			const res = await authorizeListService(dataJson);
			this.authorizeData = res;
			changePowerToEdit(this.authorizeData, this.$envConfig);
		},
		async roleList() {
			const dataJson = {
				pageIndex: this.pageIndex,
				pageSize: this.pageSize,
				...this.searchForm
			};
			const res = await roleListService(dataJson);
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
			const res = await roleDetailService(dataJson);
			this.selectData = [res];
			this.setAuthorizeHandler(res);
		},
		async showDeleteHandler() {
			const ids = this.filterSelectIdsMixin();
			const dataJson = {
				ids: ids
			};
			await roleDeleteService(dataJson);
			this.isRefreshList = true;
		},
		async editSingleHandler(row) {
			const dataJson = {
				id: row.id
			};
			const res = await roleDetailService(dataJson);
			this.editSingleHandlerMixin(res);
			this.setAuthorizeHandler(res);
		},
		deleteSingleHandler(row) {
			this.deleteSingleHandlerMixin(row);
		},
		async setAuthorizeHandler(row) {
			const dataJson = {
				id: row.id
			};
			this.editId = row.id;
			const res = await roleDetailService(dataJson);
			this.$refs.tree.setCheckedKeys(res.powerCodes);
			// 1. 是否只是叶子节点，默认值为 false 2. 是否包含半选节点，默认值为 false
			const allCheckedNodes = this.$refs.tree.getCheckedNodes(false, true);
			allCheckedNodes.forEach(node => {
				const treeNode = this.$refs.tree.getNode(node.powerCode);
				if (treeNode.childNodes !== undefined && treeNode.childNodes.length > 0) {
					// 有子节点，说明是父级
					const allcs = this.getNodeChildrenCheckState(treeNode);
					// console.log(allcs);
					if (allcs !== 2) {
						treeNode.indeterminate = true;
					}
				}
			});
			// addTreeKey(this.authorizeData);
		},
		searchFormHandler(searchForm) {
			this.searchFormHandlerMixin(searchForm);
			this.roleList();
		},
		async saveMenu() {
			const checkedNodes = this.$refs.tree.getCheckedNodes();
			const halfCheckedNodes = this.$refs.tree.getHalfCheckedNodes();
			/* const lastNodesArr = this.lastNodesMixin(checkedNodes); */
			const ids = checkedNodes.map(item => {
				return item.powerCode;
			});

			const ids1 = halfCheckedNodes.map(item => {
				return item.powerCode;
			});

			const dataJson = {
				id: this.editId,
				powerCodes: Array.from(new Set([...ids, ...ids1]))
			};
			await roleAuthorizeService(dataJson);
			this.$store.commit('setRefreshAside', true);
		},
		checkChange(node) {
			const treeNode = this.$refs.tree.getNode(node.powerCode);

			if (treeNode.checked) {
				treeNode.hasBeenChecked = true;
			} else {
				treeNode.hasBeenChecked = false;
			}

			let pTreeNode = null;
			let ppowerCode = null;
			getTreeNodeById(this.authorizeData, 'powerCode', node.parentId, pnode => {
				pTreeNode = this.$refs.tree.getNode(pnode.powerCode);
				ppowerCode = pnode.powerCode;
				// console.log(pTreeNode);
			});

			if (node.children === undefined) {
				// console.log('当前节点被选中');
				// 当前点击的节点是被选中
				// 判断当前节点的父级，下面的所有，是否都被选中了 0，都没选中，1，部分选中，2全选中
				if (pTreeNode != null) {
					const allChecked = this.getNodeChildrenCheckState(pTreeNode);
					console.log(`父节点下子节点选中状态${allChecked}`);
					if (allChecked === 0) {
						// 判断原来父级自己是否点选过
						const pHasChecked = pTreeNode.hasBeenChecked === undefined ? false : pTreeNode.hasBeenChecked;
						if (pHasChecked) {
							// 设置父级为半选状态
							pTreeNode.indeterminate = true;
							// this.$refs.tree.setChecked(ppowerCode, false, false);
						} else {
							// 设置父级为不选状态
							pTreeNode.indeterminate = false;
							this.$refs.tree.setChecked(ppowerCode, false, false);
						}
					} else if (allChecked === 1) {
						// 设置父级为半选状态
						pTreeNode.indeterminate = true;
						// this.$refs.tree.setChecked(ppowerCode, false, false);
					} else if (allChecked === 2) {
						// 设置父级为选中状态
						pTreeNode.indeterminate = false;
						this.$refs.tree.setChecked(ppowerCode, true, false);
					}
				}
			} else {
				// 点击父节点
				const allChecked = this.getNodeChildrenCheckState(treeNode);
				// console.log(`父级下的子节点选中状态${allChecked}`);
				if (allChecked === 0) {
					// 响应事件
					if (treeNode.checked) {
						treeNode.indeterminate = true;
					}
				} else {
					// 不变
					if (allChecked === 1) {
						treeNode.indeterminate = true;
					} else if (allChecked === 2) {
						this.$refs.tree.setChecked(node.powerCode, true, false);
					}
					console.log('');
				}
			}
		},
		getNodeChildrenCheckState(node) {
			let checkedcnt = 0;
			if (node === null) return 2;
			node.childNodes.forEach(item => {
				if (item.checked) checkedcnt++;
			});
			if (checkedcnt === 0) return 0;
			if (checkedcnt === node.childNodes.length) return 2;
			return 1;
		},
		getParentNode(node) {
			console.log(node);
		},
		changeNodeStatus(treeNode, node) {
			let isIndeterminate = false;
			let isChecked = true;
			treeNode.childNodes.forEach(item => {
				if (item.checked) {
					isIndeterminate = true;
				}
				if (!item.checked) {
					isChecked = false;
				}
			});
			if (isChecked) {
				this.$refs.tree.setChecked(node.powerCode, true, false);
			}
			if (!isChecked) {
				if (isIndeterminate) {
					treeNode.indeterminate = isIndeterminate;
				} else {
					this.$refs.tree.setChecked(node.powerCode, false, false);
				}
			}
		}
	}
};
</script>

<style>
</style>
