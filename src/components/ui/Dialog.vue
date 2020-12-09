<template>
	<el-dialog v-bind="$attrs" v-on="$listeners" append-to-body width="600px">
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

<style>
</style>
