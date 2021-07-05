<template>
	<div class="table-container">
		<el-table
			ref="table"
			style="width: 100%"
			v-bind="$attrs"
			v-on="$listeners"
			@selection-change="selectionChangeHandler"
			border
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
				<el-table-column
					v-if="item.type === 'image'"
					:width="item.columnWidth ? item.columnWidth : 'auto'"
					:prop="item.field"
					:label="item.label"
					:key="index"
				>
					<template slot-scope="scope">
						<img
							:src="scope.row[item.field]"
							:width="item.imageWidth ? item.imageWidth : 30"
							:height="item.imageHeight ? item.imageHeight : 30"
							alt=""
							srcset=""
						/>
					</template>
				</el-table-column>
				<el-table-column
					v-if="item.type === 'date'"
					:width="item.columnWidth ? item.columnWidth : 'auto'"
					:prop="item.field"
					:label="item.label"
					:key="index"
				>
					<template slot-scope="scope">
						{{ scope.row[item.field] | formatDate }}
					</template>
				</el-table-column>
				<el-table-column
					v-if="item.type === 'link'"
					:width="item.columnWidth ? item.columnWidth : 'auto'"
					:prop="item.field"
					:label="item.label"
					:key="index"
				>
					<template slot-scope="scope">
						<router-link v-if="item.isInlink" :to="scope.row[item.linkField]">{{ scope.row[item.field] }}</router-link>
						<a v-if="!item.isInlink" :href="scope.row[item.linkField]" target="_blank">{{ scope.row[item.field] }}</a>
					</template>
				</el-table-column>
			</template>
			<slot></slot>
		</el-table>
	</div>
</template>

<script>
export default {
	inheritAttrs: false,
	props: ['tableColumn_p', 'selectData_p', 'isHideCheckbox_p'],
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
