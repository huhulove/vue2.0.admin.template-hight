<template>
	<SearchForm :model="formData" @search="searchHandler">
		<el-form-item label="部门名称">
			<Input v-model="formData.name" placeholder="请输入部门名称" />
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

<style>
.form {
	display: flex;
}
</style>
