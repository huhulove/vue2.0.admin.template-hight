<template>
	<el-select
		ref="selectTreeEle"
		:value="nodeName"
		v-bind="$attrs"
		v-on="$listeners"
		class="select-item"
		filterable
		clearable
		@clear="clearHandler"
		:filter-method="filterHandler"
	>
		<el-option :value="nodeValue" style="height: auto">
			<el-tree
				ref="tree"
				v-bind="$attrs"
				v-on="$listeners"
				highlight-current
				accordion
				@node-click="nodeClickHandler"
				:filter-node-method="filterNode"
				:default-expanded-keys="defaultExpandedKeys"
			></el-tree>
		</el-option>
	</el-select>
</template>

<script>
import { getTreeNodeById } from '@u/htools.tree';

export default {
	inheritAttrs: false,
	props: ['nodeValue'],
	model: {
		prop: 'nodeValue',
		event: 'input'
	},
	data() {
		return {
			nodeName: null,
			defaultExpandedKeys: []
		};
	},
	watch: {
		nodeValue(newValue) {
			if (newValue) {
				this.defaultExpandedKeys = [newValue];
				getTreeNodeById(this.$attrs.data, this.$attrs['node-key'], newValue, node => {
					this.nodeName = node.label;
				});
			}
		},
		immediate: true
	},
	methods: {
		nodeClickHandler(node) {
			this.nodeName = node.label;
			/* this.$emit('update:nodeValue_p', node[this.$attrs['node-key']]); */
			this.$emit('input', node[this.$attrs['node-key']]);
			this.$refs.selectTreeEle.blur();
		},
		clearHandler() {
			this.nodeName = null;
			/* this.$emit('update:nodeValue_p', 0); */
			this.$emit('input', 0);
		},
		filterHandler(searchKey) {
			this.$refs.tree.filter(searchKey);
		},
		filterNode(value, data) {
			if (!value) return true;
			return data.label.indexOf(value) !== -1;
		}
	}
};
</script>

<style scoped lang="less">
.el-select-dropdown__item {
	background-color: #fff;
	padding: 0 !important;
}
/deep/ .el-tree-node__label{
	font-weight: normal;
}
</style>
