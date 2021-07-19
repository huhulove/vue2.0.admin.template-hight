<template>
	<el-dialog class="dialog-container" v-bind="$attrs" v-on="$listeners" append-to-body :close-on-click-modal="false">
		<slot></slot>
	</el-dialog>
</template>

<script>
export default {
	inheritAttrs: false,
	data() {
		return {};
	}
};
</script>

<style scoped lang="less">
/deep/ .el-dialog {
	width: 600px;
}
</style>
