<template>
	<SearchForm :model="formData" @search="searchHandler" :inline="true">
		<el-form-item label="角色名称">
			<Input v-model="formData.name" placeholder="请输入角色名称" />
		</el-form-item>
		<el-form-item label="公司名称" v-if="isSupperAdmin">
			<Select v-model="formData.companyId" placeholder="请选择公司名称" :optionsData_p="companyData">
				<el-option label="平台" :value="0"></el-option>
			</Select>
		</el-form-item>
	</SearchForm>
</template>

<script>
import { hgetStorage } from '@u/htools.web';

import SearchForm from '@c/ui/SearchForm';
import Input from '@c/ui/Input';
import Select from '@c/ui/Select';

import { companyListService } from '@s/baseData/CompanyService';

export default {
	components: {
		SearchForm,
		Input,
		Select
	},
	data() {
		return {
			formData: {
				name: '',
				companyId: ''
			},
			companyData: null,
			isSupperAdmin: false
		};
	},
	mounted() {
		if (hgetStorage('roleIds').indexOf(1) > -1) {
			this.isSupperAdmin = true;
		}
		this.companyList();
	},
	methods: {
		async companyList() {
			const dataJson = {
				pageIndex: 1,
				pageSize: 100000
			};
			const res = await companyListService(dataJson);
			this.companyData = res.records;
		},
		searchHandler() {
			this.$emit('searchForm', this.formData);
		}
	}
};
</script>

<style lang="less" scoped>
</style>
