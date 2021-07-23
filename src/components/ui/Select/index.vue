<template>
	<el-select
		:multiple="multiple_p"
		:value-key="valueKey_p"
		:size="size_p"
		:clearable="clearable_p"
		:collapse-tags="collapseTags_p"
		:multiple-limit="multipleLimit_p"
		:autocomplete="autocomplete_p"
		:filterable="filterable_p"
		:no-match-text="noMatchText_p"
		:no-data-text="noDataText_p"
		:popper-class="popperClass_p"
		v-bind="$attrs"
		v-on="$listeners"
		class="select-item"
	>
		<slot></slot>
		<el-option v-for="item in optionsData_p" :key="item[optionJson_p.value]" :label="item[optionJson_p.label]" :value="item[optionJson_p.value]"></el-option>
	</el-select>
</template>

<script>
export default {
	inheritAttrs: false,
	props: {
		/* 以下属性为input原生属性，采用继承方法传递给elementUI 
				value / v-model
				disabled
				name
				placeholder

		*/
		/* option 数据 */
		optionsData_p: {
			type: Array,
			default: () => {
				return [];
			}
		},
		/* 数据 key value */
		optionJson_p: {
			type: Object,
			default: () => {
				return {
					value: 'id',
					label: 'name'
				};
			}
		},
		/* 是否多选 */
		multiple_p: {
			type: Boolean,
			default: false
		},
		/* 作为 value 唯一标识的键名，绑定值为对象类型时必填 */
		valueKey_p: {
			type: String,
			default: 'value'
		},
		/* 输入框尺寸 */
		size_p: {
			type: String,
			default: '' // medium/small/mini
		},
		/* 是否可以清空选项 */
		clearable_p: {
			type: Boolean,
			default: true
		},
		/* 多选时是否将选中值按文字的形式展示 */
		collapseTags_p: {
			type: Boolean,
			default: false
		},
		/* 多选时用户最多可以选择的项目数，为 0 则不限制 */
		multipleLimit_p: {
			type: Number,
			default: 0
		},
		/* select input 的 autocomplete 属性 */
		autocomplete_p: {
			type: String,
			default: 'off'
		},
		/* 是否可搜索 */
		filterable_p: {
			type: Boolean,
			default: true
		},
		/* 搜索条件无匹配时显示的文字 */
		noMatchText_p: {
			type: String,
			default: '无匹配数据'
		},
		/* 选项为空时显示的文字 */
		noDataText_p: {
			type: String,
			default: '无数据'
		},
		/* Select 下拉框的类名 */
		popperClass_p: {
			type: String,
			default: ''
		}
	}
};
</script>

<style lang="less">
.select-item {
	width: 100%;
}
</style>
