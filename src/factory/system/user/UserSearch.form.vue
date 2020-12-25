<template>
	<div class="head-serch">
		<el-form class="form" ref="userForm" :model="userSearchForm" label-width="100px">
			<el-form-item label="用户名称">
				<el-input v-model="userSearchForm.userName" size="mini" placeholder="请输入用户名称"></el-input>
			</el-form-item>
		</el-form>
		<el-button class="filter-item" size="mini" type="success" icon="el-icon-search" @click="searchHandler">搜索</el-button>
	</div>
</template>

<script>
export default {
	data() {
		return {
			// 搜索
			userSearchForm: {
				userName: ''
			}
		};
	},
	methods: {
		searchHandler() {
			this.$emit('searchForm', this.userSearchForm);
		}
	}
};
</script>

<style lang="less" scoped>
</style>
