<template>
	<div class="table-container">
		<el-table
			ref="table"
			style="width: 100%"
			:border="border_p"
			:size="size_p"
			:fit="fit_p"
			:show-header="showHeader_p"
			:highlight-current-row="highlightCurrentRow_p"
			:empty-text="emptyText_p"
			:show-summary="showSummary_p"
			v-bind="$attrs"
			v-on="$listeners"
			@selection-change="selectionChangeHandler"
			:header-cell-style="{ background: '#F4F4F4' }"
		>
			<el-table-column v-if="!isHideCheckbox_p" type="selection" width="55" />
			<slot name="tableLeftData"></slot>
			<template v-for="(item, index) in tableColumn_p">
				<el-table-column
					:width="item.columnWidth ? item.columnWidth : 'auto'"
					:prop="item.field"
					:label="item.label"
					:key="index"
					v-if="!item.type || item.type === 'text'"
				></el-table-column>
				<el-table-column v-else :width="item.columnWidth ? item.columnWidth : 'auto'" :prop="item.field" :label="item.label" :key="item.field">
					<template slot-scope="scope">
						<ImageViewer
							v-if="item.type === 'image'"
							:imageData_p="[scope.row[item.field]]"
							:width_p="item.imageWidth ? item.imageWidth : 30"
							:height_p="item.imageHeight ? item.imageHeight : 30"
						></ImageViewer>
						<span v-else-if="item.type === 'date'">{{ scope.row[item.field] | formatDate }}</span>
						<span v-else-if="item.type === 'link'">
							<router-link v-if="item.isInlink" :to="scope.row[item.linkField]">{{ scope.row[item.field] }}</router-link>
							<a v-if="!item.isInlink" :href="scope.row[item.linkField]" target="_blank">{{ scope.row[item.field] }}</a>
						</span>
						<svg-icon v-else-if="item.type === 'icon'" :icon-class="scope.row[item.field]" class="el-input__icon" style="height: 40px; width: 20px" />
					</template>
				</el-table-column>
			</template>
			<slot></slot>
		</el-table>
	</div>
</template>

<script>
import ImageViewer from '@c/ui/ImageViewer';

export default {
	inheritAttrs: false,
	props: {
		/* 列头 */
		tableColumn_p: {
			type: Array,
			default: () => {
				return [];
			}
		},
		/* 选中数据 */
		selectData_p: {
			type: Array,
			default: () => {
				return [];
			}
		},
		/* 是否隐藏复选框 */
		isHideCheckbox_p: {
			type: Boolean,
			default: false
		},
		/* 是否带有纵向边框 */
		border_p: {
			type: Boolean,
			default: true
		},
		/* Table 的尺寸 */
		size_p: {
			type: String,
			default: '' // medium / small / mini
		},
		/* 列的宽度是否自撑开 */
		fit_p: {
			type: Boolean,
			default: true
		},
		/* 是否显示表头 */
		showHeader_p: {
			type: Boolean,
			default: true
		},
		/* 是否要高亮当前行 */
		highlightCurrentRow_p: {
			type: Boolean,
			default: true
		},
		/* 空数据时显示的文本内容 */
		emptyText_p: {
			type: String,
			default: '暂无数据'
		},
		/* 是否在表尾显示合计行 */
		showSummary_p: {
			type: Boolean,
			default: false
		}
	},
	components: {
		ImageViewer
	},
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
