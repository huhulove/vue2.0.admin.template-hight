<template>
	<el-form ref="formEle" size="small" :label-width="labelWidth_p || '100px'" v-bind="$attrs" v-on="$listeners">
		<slot></slot>
		<slot name="footer">
			<el-form-item>
				<FooterForm @cancel="formCancel" @submit="formSubmit" v-bind="$attrs" v-on="$listeners"></FooterForm>
			</el-form-item>
		</slot>
	</el-form>
</template>

<script>
import FooterForm from './FooterForm';

export default {
	inheritAttrs: false,
	props: ['labelWidth_p'],
	components: {
		FooterForm
	},
	methods: {
		formCancel() {
			this.$emit('cancel');
		},
		formSubmit() {
			this.$refs.formEle.validate(async valid => {
				this.$emit('submit', valid);
			});
		}
	}
};
</script>

<style>
</style>
