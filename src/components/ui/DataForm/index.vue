<template>
	<el-form
		ref="formEle"
		:model="model_p"
		:rules="rules_p"
		:size="size_p"
		:label-width="labelWidth_p"
		:inline="inline_p"
		:label-position="labelPosition_p"
		v-bind="$attrs"
		v-on="$listeners"
	>
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
	props: {
		size_p: {
			type: String,
			default: 'small'
		},
		model_p: {
			type: Object,
			required: true
		},
		rules_p: {
			type: Object,
			required: true
		},
		inline_p: {
			type: Boolean,
			default: false
		},
		labelPosition_p: {
			type: String,
			default: 'right' // right/left/top
		},
		labelWidth_p: {
			type: String,
			default: '100px'
		}
	},
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
