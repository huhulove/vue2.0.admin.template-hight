<template>
	<div class="modal" v-if="$attrs.visible">
		<el-dialog class="dialog-container" v-bind="$attrs" v-on="$listeners" :close-on-click-modal="false" :modal-append-to-body="false">
			<slot></slot>
		</el-dialog>
	</div>
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
.modal {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	/deep/ .v-modal,
	/deep/ .el-dialog__wrapper {
		position: absolute;
	}
	/deep/ .el-dialog {
		width: 600px;
	}
}
</style>
