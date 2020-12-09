<template>
	<div class="table-container">
		<el-table ref="table" style="width: 100%" v-bind="$attrs" v-on="$listeners" @selection-change="selectionChangeHandler">
			<el-table-column type="selection" width="55" />
			<el-table-column v-for="(item, index) in tableColumn_p" :key="index" :prop="item.field" :label="item.label"></el-table-column>
			<slot></slot>
		</el-table>
	</div>
</template>

<script>
export default {
	inheritAttrs: false,
	props: ['tableColumn_p', 'selectData_p'],
	data() {
		return {};
	},
	methods: {
		selectionChangeHandler(data) {
			this.$emit('update:selectData_p', data);
		},
		clearSelection() {
			this.$refs.table.clearSelection();
		}
	}
};
</script>

<style>
</style>
