<template>
	<el-form
		ref="formEle"
		:model="model_p"
		:rules="rules_p"
		:size="size_p"
		:label-width="labelWidth_p"
		:inline="inline_p"
		:label-position="labelPosition_p"
		:inline-message="inlineMessage_p"
		:show-message="showMessage_p"
		:hide-required-asterisk="hideRequiredAsterisk_p"
		v-bind="$attrs"
		v-on="$listeners"
	>
		<slot></slot>
	</el-form>
</template>

<script>
export default {
	inheritAttrs: false,
	props: {
		/* 表单数据对象 */
		model_p: {
			type: Object,
			required: true
		},
		/* 表单验证规则 */
		rules_p: {
			type: Object
		},
		/* 用于控制该表单内组件的尺寸 */
		size_p: {
			type: String,
			default: 'small' // medium / small / mini
		},
		/* 行内表单模式 */
		inline_p: {
			type: Boolean,
			default: false
		},
		/* 表单域标签的位置 */
		labelPosition_p: {
			type: String,
			default: 'right' // right / left / top
		},
		/* 表单域标签的宽度 */
		labelWidth_p: {
			type: String,
			default: '100px'
		},
		/* 是否以行内形式展示校验信息 */
		inlineMessage_p: {
			type: Boolean,
			default: false
		},
		/* 是否显示校验错误信息 */
		showMessage_p: {
			type: Boolean,
			default: true
		},
		/* 是否隐藏必填字段的标签旁边的红色星号 */
		hideRequiredAsterisk_p: {
			type: Boolean,
			default: false
		}
	}
};
</script>

<style>
</style>
