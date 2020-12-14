<template>
	<div class="head-serch">
		<el-form class="form" ref="roleSearchForm" :model="roleSearchForm" label-width="100px">
			<el-form-item label="角色名称">
				<el-input v-model="roleSearchForm.roleName" size="mini" placeholder="请输入用户名称"></el-input>
			</el-form-item>
		</el-form>
		<el-button class="filter-item" size="mini" type="success" icon="el-icon-search" @click="searchHandler">搜索</el-button>
	</div>
</template>

<script>
export default {
	data() {
		return {
			roleSearchForm: {
				roleName: null
			}
		};
	},
	methods: {
		searchHandler() {
			this.$emit('searchForm', this.roleSearchForm);
		}
	}
};
</script>

<style lang="less" scoped>
.head-serch {
	display: flex;
	align-items: center;
	.form {
		margin-right: 10px;
	}
	.el-form-item {
		margin-bottom: 3px;
	}
}
</style>
