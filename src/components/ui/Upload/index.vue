<template>
	<el-upload
		:headers="headers_p"
		:data="data_p"
		:name="name_p"
		:show-file-list="showFileList_p"
		:drag="drag_p"
		:list-type="listType_p"
		:limit="limit_p"
		class="upload-demo"
		v-bind="$attrs"
		v-on="$listeners"
	>
		<slot name="uploadButton">
			<el-button size="small" type="primary">点击上传</el-button>
		</slot>
		<div v-if="isShowTip_p" slot="tip" class="el-upload__tip">
			<slot></slot>
		</div>
	</el-upload>
</template>

<script>
export default {
	inheritAttrs: false,
	props: {
		/* 是否显示提示信息 */
		isShowTip_p: {
			type: Boolean,
			default: false
		},
		/* 设置上传的请求头部 */
		headers_p: {
			type: Object
		},
		/* 上传时附带的额外参数 */
		data_p: {
			type: Object
		},
		/* 上传的文件字段名 */
		name_p: {
			type: String,
			default: 'file'
		},
		/* 是否显示已上传文件列表 */
		showFileList_p: {
			type: Boolean,
			default: true
		},
		/* 是否启用拖拽上传 */
		drag_p: {
			type: Boolean,
			default: false
		},
		/* 文件列表的类型 */
		listType_p: {
			type: String,
			default: 'text' // text/picture/picture-card
		},
		/* 最大允许上传个数 */
		limit_p: {
			type: Number
		}
	},
	data() {
		return {};
	},
	created() {},
	methods: {}
};
</script>
<style lang="less" scoped>
</style>
