<template>
	<el-card :shadow="shadow_p" :body-style="bodyStyle_p" v-bind="$attrs" v-on="$listeners">
		<template slot="header">
			<slot name="header"></slot>
		</template>
		<slot></slot>
	</el-card>
</template>

<script>
export default {
	inheritAttrs: false,
	props: {
		shadow_p: {
			type: String,
			default: 'never' // always / hover / never
		},
		bodyStyle_p: {
			type: Object,
			default: () => {
				return { padding: '20px' };
			}
		}
	}
};
</script>

<style>
</style>
