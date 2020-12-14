<template>
	<div class="head-container">
		<el-button
			id="btn-add"
			class="filter-item"
			v-authorize="{ name: 'add', type: authorize_p, id: 'btn-add' }"
			type="primary"
			icon="el-icon-plus"
			@click="showDialogAdd"
		>
			新增
		</el-button>
		<el-button
			id="btn-update"
			class="filter-item"
			v-authorize="{ name: 'update', type: authorize_p, id: 'btn-update' }"
			type="success"
			icon="el-icon-edit"
			:disabled="selectData_p.length !== 1"
			@click="showDialogEdit"
		>
			修改
		</el-button>
		<el-button
			id="btn-remove"
			class="filter-item"
			v-authorize="{ name: 'remove', type: authorize_p, id: 'btn-remove' }"
			type="danger"
			icon="el-icon-delete"
			:disabled="selectData_p.length < 1"
			@click="showDeleteHandler"
		>
			删除
		</el-button>
		<el-button
			id="btn-download"
			class="filter-item"
			v-authorize="{ name: 'download', type: authorize_p, id: 'btn-download' }"
			type="warning"
			icon="el-icon-download"
		>
			导出
		</el-button>
		<slot></slot>
	</div>
</template>

<script>
export default {
	props: {
		selectData_p: {
			type: Array
		},
		delTips_p: {
			type: String
		},
		authorize_p: {
			type: String
		}
	},
	data() {
		return {};
	},
	methods: {
		showDialogAdd() {
			this.$emit('showDialogAdd');
		},
		showDialogEdit() {
			this.$emit('showDialogEdit');
		},
		showDeleteHandler() {
			this.$confirm(this.delTips_p || '确认此操作吗？', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			})
				.then(() => {
					this.$emit('showDelete');
				})
				.catch(error => {
					console.log(error);
				});
		}
	}
};
</script>

<style lang="less" scoped>
.head-container {
	margin-top: 12px;
	.el-form-item {
		margin-bottom: 12px;
	}
	.filter-item {
		display: inline-block;
		vertical-align: middle;
		margin: 0 3px 10px 0;
	}
}
</style>
