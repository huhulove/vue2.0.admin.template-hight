<template>
	<div class="head-serch">
		<el-form
			class="form"
			ref="hospitalLevelSearchForm"
			:model="hospitalLevelSearchForm"
			label-width="60px"
			@submit.native.prevent
			@keyup.enter.native="searchHandler"
		>
			<el-form-item label="名称">
				<el-input v-model="hospitalLevelSearchForm.equipment" placeholder="请输入名称" />
			</el-form-item>
			<el-form-item label="企业" prop="name" v-if="currentUserOrganization === 0">
				<el-select v-model="hospitalLevelSearchForm.organizationId" placeholder="请选择" class="select-item" clearable filterable>
					<el-option
						v-for="(enterprise, index) in enterpriseData"
						:key="index"
						:label="enterprise.organizationName"
						:value="enterprise.id"
					></el-option>
				</el-select>
			</el-form-item>
		</el-form>
		<el-button class="filter-item" size="mini" type="success" icon="el-icon-search" @click="searchHandler">搜索</el-button>
	</div>
</template>

<script>
// import { enterpriseListService } from '@s/base/EnterpriseService';
import { hgetStorage } from '@/util/htools.web';

export default {
	data() {
		return {
			hospitalLevelSearchForm: {
				equipment: '',
				organizationId: ''
			},
			currentUserOrganization: '',
			enterpriseData: []
		};
	},
	created() {
		this.currentUserOrganization = hgetStorage('organization');
		// this.enterpriseList();
	},
	methods: {
		// async enterpriseList() {
		// 	const dataJson = {
		// 		pageNum: 1,
		// 		pageSize: 100000
		// 	};
		// 	const res = await enterpriseListService(dataJson);
		// 	this.enterpriseData = res.records;
		// },
		searchHandler() {
			this.$emit('searchForm', this.hospitalLevelSearchForm);
		}
	}
};
</script>

<style>
.form {
	display: flex;
}
</style>
