<template>
	<el-radio-group :size="size_p" :text-color="textColor_p" :fill="fill_p" v-bind="$attrs" v-on="$listeners">
		<el-radio :label="item.value" v-for="item in data_p" :key="item.value">{{ item.label }}</el-radio>
	</el-radio-group>
</template>

<script>
export default {
	inheritAttrs: false,
	props: {
		/* 以下属性为input原生属性，采用继承方法传递给elementUI 
				value / v-model
				disabled
		*/
		/* radio数据 */
		data_p: {
			type: Array,
			default: () => {
				return {};
			}
		},
		/* 单选框组尺寸，仅对按钮形式的 Radio 或带有边框的 Radio 有效 */
		size_p: {
			type: String,
			default: '' // medium / small / mini
		},
		/* 按钮形式的 Radio 激活时的文本颜色 */
		textColor_p: {
			type: String,
			default: '#ffffff'
		},
		/* 按钮形式的 Radio 激活时的填充色和边框色 */
		fill_p: {
			type: String,
			default: '#409EFF'
		}
	}
};
</script>

<style>
</style>
