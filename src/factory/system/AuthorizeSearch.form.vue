<template>
	<div class="head-serch">
		<el-form ref="authorizeSearchForm" :model="authorizeSearchForm" label-width="100px">
			<el-form-item label="权限名称">
				<el-input v-model="authorizeSearchForm.authorizeName" size="mini" placeholder="请输入权限名称"></el-input>
			</el-form-item>
		</el-form>
		<el-button class="filter-item" size="mini" type="success" icon="el-icon-search" @click="searchHandler">搜索</el-button>
	</div>
</template>

<script>
export default {
	data() {
		return {
			authorizeSearchForm: {
				authorizeName: null
			}
		};
	},
	methods: {
		searchHandler() {
			this.$emit('searchForm', this.authorizeSearchForm);
		}
	}
};
</script>

<style scoped>
.head-serch {
	display: flex;
	align-items: center;
	padding-bottom: 10px;
}
</style>
