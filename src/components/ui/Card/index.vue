<template>
	<el-card shadow="never" v-bind="$attrs" v-on="$listeners">
		<template slot="header">
			<slot name="header"></slot>
		</template>
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
