<template>
	<el-row>
		<el-col :span="24" class="pagination-container">
			<el-pagination
				style="margin-top: 8px"
				@size-change="sizeChangeHandler"
				@current-change="currentChangeHandler"
				:current-page="pageIndex_p"
				:page-sizes="[10, 100, 200, 300, 400]"
				:page-size="pageSize_p"
				layout="total, sizes, prev, pager, next, jumper"
				v-bind="$attrs"
				v-on="$listeners"
			></el-pagination>
		</el-col>
	</el-row>
</template>

<script>
export default {
	inheritAttrs: false,
	props: ['pageIndex_p', 'pageSize_p'],
	data() {
		return {};
	},
	methods: {
		sizeChangeHandler(val) {
			console.log(`每页 ${val} 条`);
			this.$emit('update:pageSize_p', val);
		},
		currentChangeHandler(val) {
			console.log(`当前页: ${val}`);
			this.$emit('update:pageIndex_p', val);
		}
	}
};
</script>

<style scoped lang="less">
.pagination-container {
	margin-top: 20px;
	text-align: right;
}
</style>
