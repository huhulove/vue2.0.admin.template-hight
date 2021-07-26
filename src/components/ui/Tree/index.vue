<template>
	<el-tree :data="data_p" :empty-text="emptyText_p" :node-key="nodeKey_p"></el-tree>
</template>

<script>
export default {
	props: {
		/* 展示数据 */
		data_p: {
			type: Array,
			default: () => {
				return [];
			}
		},
		/* 内容为空的时候展示的文本 */
		emptyText_p: {
			type: String,
			default: ''
		},
		/* 每个树节点用来作为唯一标识的属性，整棵树应该是唯一的 */
		nodeKey_p: {
			type: String,
			default: ''
		}
	}
};
</script>

<style>
</style>
