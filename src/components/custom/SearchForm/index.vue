<template>
	<div class="head-search">
		<el-form class="form" label-width="80px" @submit.native.prevent @keyup.enter.native="searchHandler" v-bind="$attrs" v-on="$listeners">
			<slot></slot>
		</el-form>
		<el-button type="success" icon="el-icon-search" @click.enter="searchHandler">搜索</el-button>
	</div>
</template>

<script>
export default {
	inheritAttrs: false,
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
