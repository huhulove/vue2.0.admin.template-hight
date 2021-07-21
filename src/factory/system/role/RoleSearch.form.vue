<template>
	<SearchForm :model="formData" @search="searchHandler">
		<el-form-item label="角色名称">
			<Input v-model="formData.name" placeholder="请输入角色名称" />
		</el-form-item>
	</SearchForm>
</template>

<script>
import SearchForm from '@c/ui/SearchForm';
import Input from '@c/ui/Input';

export default {
	components: {
		SearchForm,
		Input
	},
	data() {
		return {
			formData: {
				name: null
			}
		};
	},
	methods: {
		searchHandler() {
			this.$emit('searchForm', this.formData);
		}
	}
};
</script>

<style lang="less" scoped>
</style>
