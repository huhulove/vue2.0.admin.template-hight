<template>
	<div class="modal" v-if="visible">
		<el-dialog
			:visible.sync="visible"
			:title="title_p"
			:width="width_p"
			:fullscreen="fullscreen_p"
			:close-on-click-modal="closeOnClickModal_p"
			:top="top_p"
			:modal="modal_p"
			:modal-append-to-body="modalAppendToBody_p"
			:append-to-body="appendToBody_p"
			:lock-scroll="lockScroll_p"
			:custom-class="customClass_p"
			:close-on-press-escape="closeOnPressEscape_p"
			:show-close="showClose_p"
			v-bind="$attrs"
			v-on="$listeners"
		>
			<slot></slot>
		</el-dialog>
	</div>
</template>

<script>
export default {
	inheritAttrs: false,
	props: {
		/* 是否显示 Dialog，支持 .sync 修饰符 */
		visible_p: {
			type: Boolean,
			default: false,
			required: true
		},
		/* Dialog 的标题 */
		title_p: {
			type: String,
			default: ''
		},
		/* Dialog 的宽度 */
		width_p: {
			type: String,
			default: '40%'
		},
		/* 是否为全屏 Dialog */
		fullscreen_p: {
			type: Boolean,
			default: false
		},
		/* Dialog CSS 中的 margin-top 值 */
		top_p: {
			type: String,
			default: '15vh'
		},
		/* 是否需要遮罩层 */
		modal_p: {
			type: Boolean,
			default: true
		},
		/* 遮罩层是否插入至 body 元素上，若为 false，则遮罩层会插入至 Dialog 的父元素上 */
		modalAppendToBody_p: {
			type: Boolean,
			default: false
		},
		/* Dialog 自身是否插入至 body 元素上。嵌套的 Dialog 必须指定该属性并赋值为 true */
		appendToBody_p: {
			type: Boolean,
			default: false
		},
		/* 是否在 Dialog 出现时将 body 滚动锁定 */
		lockScroll_p: {
			type: Boolean,
			default: true
		},
		/* Dialog 的自定义类名 */
		customClass_p: {
			type: String,
			default: ''
		},
		/* 是否可以通过点击 modal 关闭 Dialog */
		closeOnClickModal_p: {
			type: Boolean,
			default: false
		},
		/* 是否可以通过按下 ESC 关闭 Dialog */
		closeOnPressEscape_p: {
			type: Boolean,
			default: true
		},
		/* 是否显示关闭按钮 */
		showClose_p: {
			type: Boolean,
			default: true
		}
	},
	data() {
		return {
			visible: this.visible_p
		};
	},
	watch: {
		visible_p(newValue) {
			this.visible = newValue;
		},
		visible(newValue) {
			if (!newValue) {
				this.$emit('update:visible_p', false);
			}
		}
	}
};
</script>

<style scoped lang="less">
.modal {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	/deep/ .v-modal,
	/deep/ .el-dialog__wrapper {
		position: absolute;
	}
	/deep/ .el-dialog {
		width: 600px;
	}
}
</style>
