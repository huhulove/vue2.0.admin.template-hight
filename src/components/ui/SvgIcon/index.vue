<template>
	<div v-if="isExternal" :style="styleExternalIcon" class="svg-external-icon svg-icon" v-on="$listeners" />
	<svg v-else :class="svgClass" aria-hidden="true" v-on="$listeners">
		<use :href="iconName" />
	</svg>
</template>

<script>

export default {
	name: 'SvgIcon',
	props: {
		iconClass: {
			type: String,
			required: true
		},
		className: {
			type: String,
			default: 'el-input__icon'
		}
	},
	computed: {
		isExternal() {
			return /^(https?:|mailto:|tel:)/.test(this.iconClass);
		},
		iconName() {
			return `#icon-${this.iconClass}`;
		},
		svgClass() {
			if (this.className) {
				return `'svg-icon ${this.className}`;
			}
			return 'svg-icon';
		},
		styleExternalIcon() {
			return {
				mask: `url(${this.iconClass}) no-repeat 50% 50%`,
				'-webkit-mask': `url(${this.iconClass}) no-repeat 50% 50%`
			};
		}
	}
};
</script>

<style scoped>
.svg-icon {
	width: 1em;
	height: 1em;
	vertical-align: -0.15em;
	fill: currentColor;
	overflow: hidden;
}

.svg-external-icon {
	background-color: currentColor;
	mask-size: cover !important;
	display: inline-block;
}
.el-input__icon {
	height: 16px;
	width: 16px;
	vertical-align: middle;
	/* &.big {
		height: 20px;
		width: 20px;
	} */
}
</style>
