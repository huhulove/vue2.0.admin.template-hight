<template>
	<el-input v-bind="$attrs" v-on="$listeners" clearable />
</template>

<script>
export default {
	inheritAttrs: false
};
</script>

<style lang="less">
.input-item {
	width: 100%;
}
</style>
