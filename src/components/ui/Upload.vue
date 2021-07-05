<template>
	<el-upload class="upload-demo" v-bind="$attrs" v-on="$listeners">
		<el-button size="small" type="primary">点击上传</el-button>
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
