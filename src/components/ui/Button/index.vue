<template>
	<div class="head-button">
		<el-button id="btn-add" class="button-item" type="primary" v-authorize="{ name: 'add', type: authorize_p, id: 'btn-add' }" @click="showDialogAdd">新增</el-button>
		<el-button
			id="btn-update"
			class="button-item"
			type="success"
			v-authorize="{ name: 'update', type: authorize_p, id: 'btn-update' }"
			:disabled="selectData_p.length !== 1"
			@click="showDialogEdit"
		>
			修改
		</el-button>
		<el-button
			id="btn-remove"
			class="button-item"
			type="danger"
			v-authorize="{ name: 'remove', type: authorize_p, id: 'btn-remove' }"
			:disabled="selectData_p.length < 1"
			@click="showDeleteHandler"
		>
			删除
		</el-button>
		<slot></slot>
	</div>
</template>

<script>
export default {
	props: {
		selectData_p: {
			type: Array,
			default: () => {
				return [];
			}
		},
		delTips_p: {
			type: String,
			default: ''
		},
		authorize_p: {
			type: String
		},
		editDisabled_p: {
			type: Boolean
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
.head-button {
	margin: 12px 0;
	.button-item {
		display: inline-block;
		margin-right: 6px;
		margin-left: 0;
	}
}
</style>
