<template>
	<div class="head-search">
		<Form class="form" :labelWidth_p="labelWidth_p" @submit.native.prevent @keyup.enter.native="searchHandler" v-bind="$attrs" v-on="$listeners">
			<slot></slot>
		</Form>
		<SearchButton @click.enter="searchHandler">搜索</SearchButton>
	</div>
</template>

<script>
import Form from '@c/ui/Form';
import SearchButton from '@c/ui/Button/search';

export default {
	inheritAttrs: false,
	components: {
		SearchButton,
		Form
	},
	props: {
		/* 表单label宽度 */
		labelWidth_p: {
			type: String,
			default: '80px'
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
