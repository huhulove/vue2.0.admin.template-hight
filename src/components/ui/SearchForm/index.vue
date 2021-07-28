<template>
	<div class="head-search">
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
			@submit.native.prevent
			@keyup.enter.native="searchHandler"
			v-bind="$attrs"
			v-on="$listeners"
		>
			<slot></slot>
		</el-form>
		<SearchButton @click.enter="searchHandler"></SearchButton>
	</div>
</template>

<script>
import SearchButton from '@c/ui/Button/search';

export default {
	inheritAttrs: false,
	components: {
		SearchButton
	},
	props: {
		/* 表单label宽度 */
		labelWidth_p: {
			type: String,
			default: '80px'
		},
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
	},
	data() {
		return {};
	},
	methods: {
		searchHandler() {
			this.$emit('search');
		}
	}
};
</script>

<style scoped lang="less">
.head-search {
	margin-bottom: 10px;
	.el-form {
		margin-right: 10px;
		display: inline-block;
		vertical-align: top;
	}
	.el-form-item {
		margin-bottom: 3px;
	}
}
</style>
