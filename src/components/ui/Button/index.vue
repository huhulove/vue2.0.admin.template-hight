<template>
	<el-button
		:size="size_p"
		:type="type_p"
		:plain="plain_p"
		:round="round_p"
		:circle="circle_p"
		:loading="loading_p"
		:icon="icon_p"
		:autofocus="autofocus_p"
		:native-type="nativeType_p"
	></el-button>
</template>

<script>
export default {
	props: {
		/* 以下属性为原生属性 
				disabled		是否禁用状态
		*/
		/* 尺寸 */
		size_p: {
			type: String,
			default: '' // medium / small / mini
		},
		/* 类型 */
		type_p: {
			type: String,
			default: '' // primary / success / warning / danger / info / text
		},
		/* 是否朴素按钮 */
		plain_p: {
			type: Boolean,
			default: false
		},
		/* 是否圆角按钮 */
		round_p: {
			type: Boolean,
			default: false
		},
		/* 是否圆形按钮 */
		circle_p: {
			type: Boolean,
			default: false
		},
		/* 是否加载中状态 */
		loading_p: {
			type: Boolean,
			default: false
		},
		/* 图标类名 */
		icon_p: {
			type: String,
			default: ''
		},
		/* 是否默认聚焦 */
		autofocus_p: {
			type: Boolean,
			default: false
		},
		/* 原生 type 属性 */
		nativeType_p: {
			type: String,
			default: 'button' // button / submit / reset
		}
	}
};
</script>

<style>
</style>
