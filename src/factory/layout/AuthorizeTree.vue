<template>
	<div>
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
			@node-click="nodeClick"
		></el-tree>
	</div>
</template>

<script>
import { getTreeNodeById, getChildrenNodes } from '@u/htools.tree.js';
import { authorizeListService } from '@s/systemManager/AuthorizeService';
// eslint-disable-next-line import/no-cycle
import { changePowerToEdit } from '@u/index';

export default {
	props: ['hasPowerCodes_p'],
	data() {
		return {
			authorizeData: [],
			defaultProps: { children: 'children', label: 'powerName' }
		};
	},
	watch: {
		hasPowerCodes_p: {
			handler(newValue) {
				this.setAuthorizeHandler(newValue);
			},
            deep: true
		}
	},
	mounted() {
		this.authorizeList();
	},
	methods: {
		async authorizeList() {
			const dataJson = {};
			const res = await authorizeListService(dataJson);
			this.authorizeData = res;
			changePowerToEdit(this.authorizeData, this.$envConfig);
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
		nodeClick(data, node) {
			if (!data.children || data.children.length === 0) {
				return false;
			}
			const checkedNodes = this.$refs.tree.getCheckedNodes();
			const halfCheckedNodes = this.$refs.tree.getHalfCheckedNodes();
			const activedPowerCodes = [];
			getChildrenNodes(this.authorizeData, data.powerCode, activedPowerCodes, 'powerCode');
			halfCheckedNodes.forEach(halfNode => {
				const index = checkedNodes.indexOf(halfNode);
				if (index > -1) {
					checkedNodes.splice(index, 1);
				}
			});
			if (node.indeterminate || (!node.checked && !node.indeterminate)) {
				checkedNodes.forEach(node => {
					activedPowerCodes.push(node.powerCode);
				});
				this.$refs.tree.setCheckedKeys(activedPowerCodes);
			} else {
				for (let i = 0; i < checkedNodes.length; i++) {
					const node = checkedNodes[i];
					const index = activedPowerCodes.indexOf(node.powerCode);
					if (index > -1) {
						checkedNodes.splice(i, 1);
						i--;
					}
				}
				this.$refs.tree.setCheckedNodes(checkedNodes);
			}

			halfCheckedNodes.forEach(halfNode => {
				if (data.powerCode !== halfNode.powerCode) {
					const treeNode = this.$refs.tree.getNode(halfNode.powerCode);
					treeNode.indeterminate = true;
				}
			});
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
		async setAuthorizeHandler(powerCodes) {
			this.$refs.tree.setCheckedKeys(powerCodes);
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
		}
	}
};
</script>

<style>
</style>
