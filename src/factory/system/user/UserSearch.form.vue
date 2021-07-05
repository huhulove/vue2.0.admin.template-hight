<template>
	<SearchForm :model="formData" @search="searchHandler">
		<el-form-item label="用户名称">
			<Input v-model="formData.nickName" placeholder="请输入用户名称" />
		</el-form-item>
		<!-- <el-form-item label="企业名称" prop="name">
				<el-select v-model="formData.organizationId" placeholder="请选择企业名称" class="select-item" clearable filterable>
					<el-option
						v-for="(enterprise, index) in enterpriseData"
						:key="index"
						:label="enterprise.organizationName"
						:value="enterprise.id"
					></el-option>
				</el-select>
			</el-form-item> -->
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
				nickName: '',
				organizationId: ''
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
