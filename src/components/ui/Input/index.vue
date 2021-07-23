<template>
	<el-input
		:type="type_p"
		:maxlength="maxlength_p"
		:minlength="minlength_p"
		:show-word-limit="showWordLimit_p"
		:clearable="clearable_p"
		:show-password="showPassword_p"
		:size="size_p"
		:prefix-icon="prefixIcon_p"
		:suffix-icon="suffixIcon_p"
		:rows="rows_p"
		:autosize="autosize_p"
		:autocomplete="autocomplete_p"
		:resize="resize_p"
		:label="label_p"
		v-bind="$attrs"
		v-on="$listeners"
	/>
</template>

<script>
export default {
	inheritAttrs: false,
	props: {
		/* 
			以下属性为input原生属性，采用继承方法传递给elementUI 
				value / v-model			绑定值
				placeholder				输入框占位文本
				disabled				禁用
				name	
				readonly				是否只读
				max						设置最大值
				min						设置最小值
				step					设置输入字段的合法数字间隔
				autofocus				自动获取焦点	true, false
				form
		*/
		/* 类型 */
		type_p: {
			type: String,
			default: 'text'
		},
		/* 原生属性，最小输入长度 */
		minlength_p: {
			type: Number
		},
		/* 原生属性，最大输入长度 */
		maxlength_p: {
			type: Number
		},
		/* 是否显示输入字数统计，只在 type = "text" 或 type = "textarea" 时有效 */
		showWordLimit_p: {
			type: Boolean,
			default: false
		},
		/* 是否可清空 */
		clearable_p: {
			type: Boolean,
			default: true
		},
		/* 是否显示切换密码图标 */
		showPassword_p: {
			type: Boolean,
			default: false
		},
		/* 输入框尺寸，只在 type!="textarea" 时有效 */
		size_p: {
			type: String // medium / small / mini
		},
		/* 输入框头部图标 */
		prefixIcon_p: {
			type: String,
			default: ''
		},
		/* 输入框尾部图标 */
		suffixIcon_p: {
			type: String,
			default: ''
		},
		/* 输入框行数，只对 type="textarea" 有效 */
		rows_p: {
			type: Number,
			default: 2
		},
		/* 自适应内容高度，只对 type="textarea" 有效，可传入对象，如，{ minRows: 2, maxRows: 6 } */
		autosize_p: {
			type: Boolean || Object,
			default: false
		},
		/* 原生属性，自动补全 */
		autocomplete_p: {
			type: String,
			default: 'off'
		},
		/* 控制是否能被用户缩放 */
		resize_p: {
			type: String,
			default: '' // none, both, horizontal, vertical
		},
		/* 输入框关联的label文字 */
		label_p: {
			type: String,
			default: ''
		}
	}
};
</script>

<style lang="less">
.input-item {
	width: 100%;
}
</style>
