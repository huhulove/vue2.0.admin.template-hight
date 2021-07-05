<template>
	<div class="head-serch">
		<el-form class="form" label-width="100px" @submit.native.prevent @keyup.enter.native="searchHandler" v-bind="$attrs" v-on="$listeners">
			<slot></slot>
		</el-form>
		<el-button class="filter-item" type="success" icon="el-icon-search" @click.enter="searchHandler">搜索</el-button>
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

<style>
</style>
