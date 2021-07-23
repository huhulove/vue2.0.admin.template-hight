<template>
	<div class="dialog-footer">
		<span>
			<el-button @click="formCancel" v-if="!$attrs.isHideCancel_p">取 消</el-button>
			<el-button type="primary" @click="formSubmit">确 定</el-button>
		</span>
	</div>
</template>

<script>
export default {
	data() {
		return {};
	},
	methods: {
		formCancel() {
			this.$emit('cancel');
		},
		formSubmit() {
			this.$emit('submit');
		}
	}
};
</script>

<style scoped lang="less">
.dialog-footer {
	text-align: right;
}
</style>
