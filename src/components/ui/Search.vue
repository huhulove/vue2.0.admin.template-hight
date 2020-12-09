<template>
	<el-form :model="ruleForm" ref="ruleForm" label-width="100px">
		<div class="head-serch">
			<slot></slot>
			<el-button class="filter-item" size="mini" type="success" icon="el-icon-search" @click="search">搜索</el-button>
			<el-button class="filter-item" size="mini" type="warning" icon="el-icon-refresh-left" @click="resetForm('ruleForm')">重置</el-button>
		</div>
	</el-form>
</template>

<script>
export default {
	data() {
		return {
			// 搜索
			ruleForm: {
				blurry: null,
				createTime: null,
				enabled: null,
				page: 1,
				size: 10
			},
			// 搜索下拉
			enabledTypeOptions: [
				{ key: 'true', display_name: '激活' },
				{ key: 'false', display_name: '锁定' }
			]
		};
	},
	mounted() {
		console.log(this.$refs.slotaaaa);
	},
	methods: {
		search() {
			console.log(this.ruleForm);
		},
		resetForm(formName) {
			this[formName] = {};
			// 没用？
			this.$refs[formName].resetFields();
		}
	}
};
</script>

<style>
</style>
