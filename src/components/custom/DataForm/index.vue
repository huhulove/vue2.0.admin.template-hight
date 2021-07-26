<template>
	<Form ref="formEle" v-bind="$attrs" v-on="$listeners">
		<slot></slot>
		<slot name="footer">
			<el-form-item>
				<FooterForm @cancel="formCancel" @submit="formSubmit" v-bind="$attrs" v-on="$listeners"></FooterForm>
			</el-form-item>
		</slot>
	</Form>
</template>

<script>
import Form from '@c/ui/Form';
import FooterForm from '@c/ui/FooterForm';

export default {
	inheritAttrs: false,
	props: {},
	components: {
		Form,
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
