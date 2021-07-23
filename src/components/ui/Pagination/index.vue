<template>
	<div class="pagination-container">
		<el-pagination
			:small="small_p"
			:background="background_p"
			:total="total_p"
			:page-size="pageSize_p"
			:current-page="pageIndex_p"
			:pager-count="pagerCount_p"
			:layout="layout_p"
			:page-sizes="pageSizes_p"
			:popper-class="popperClass_p"
			:prev-text="prevText_p"
			:next-text="nextText_p"
			:hide-on-single-page="hideOnSinglePage_p"
			@size-change="sizeChangeHandler"
			@current-change="currentChangeHandler"
			v-bind="$attrs"
			v-on="$listeners"
		></el-pagination>
	</div>
</template>

<script>
export default {
	inheritAttrs: false,
	props: {
		/* 是否使用小型分页样式 */
		small_p: {
			type: Boolean,
			default: false
		},
		/* 是否为分页按钮添加背景色 */
		background_p: {
			type: Boolean,
			default: true
		},
		/* 每页显示条目个数，支持 .sync 修饰符 */
		pageSize_p: {
			type: Number,
			default: 10
		},
		/* 当前页数，支持 .sync 修饰符 */
		pageIndex_p: {
			type: Number,
			default: 1
		},
		/* 总条目数 */
		total_p: {
			type: Number
		},
		/* 页码按钮的数量，当总页数超过该值时会折叠 */
		pagerCount_p: {
			type: Number,
			default: 7 // 大于等于 5 且小于等于 21 的奇数
		},
		/* 组件布局，子组件名用逗号分隔 */
		layout_p: {
			type: String,
			default: 'total, sizes, prev, pager, next, jumper' // prev, pager, next, jumper, ->, total, slot
		},
		/* 每页显示个数选择器的选项设置 */
		pageSizes_p: {
			type: Array,
			default: () => {
				return [10, 20, 30, 40, 50, 100];
			}
		},
		/* 每页显示个数选择器的下拉框类名 */
		popperClass_p: {
			type: String,
			default: ''
		},
		/* 替代图标显示的上一页文字 */
		prevText_p: {
			type: String,
			default: ''
		},
		/* 替代图标显示的下一页文字 */
		nextText_p: {
			type: String,
			default: ''
		},
		/* 只有一页时是否隐藏 */
		hideOnSinglePage_p: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {};
	},
	methods: {
		sizeChangeHandler(val) {
			this.$emit('update:pageSize_p', val);
		},
		currentChangeHandler(val) {
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
