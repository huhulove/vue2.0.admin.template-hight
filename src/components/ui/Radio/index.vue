<template>
	<el-radio-group v-bind="$attrs" v-on="$listeners">
		<el-radio :label="item.value" v-for="item in data_p" :key="item.value">{{ item.label }}</el-radio>
	</el-radio-group>
</template>

<script>
export default {
	inheritAttrs: false,
	props: ['data_p']
};
</script>

<style>
</style>
