<template>
	<el-card shadow="never" v-bind="$attrs" v-on="$listeners">
		<slot></slot>
	</el-card>
</template>

<script>
export default {
	inheritAttrs: false
};
</script>

<style>
</style>
