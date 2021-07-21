<template>
	<el-upload class="upload-demo" v-bind="$attrs" v-on="$listeners">
		<slot name="uploadButton">
			<el-button size="small" type="primary">点击上传</el-button>
		</slot>
		<div v-if="isShowTip_p || false" slot="tip" class="el-upload__tip">
			<slot></slot>
		</div>
	</el-upload>
</template>

<script>
export default {
	inheritAttrs: false,
	props: ['isShowTip_p'],
	data() {
		return {};
	},
	created() {},
	methods: {}
};
</script>
<style lang="less" scoped>
</style>
