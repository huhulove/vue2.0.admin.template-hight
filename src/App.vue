<template>
	<div id="app">
		<router-view />
	</div>
</template>

<style lang="less">
* {
	padding: 0;
	margin: 0;
}
html,
body,
#app {
	height: 100%;
	.v-modal {
		left: 200px;
		top: 95px;
	}
	.el-menu {
		border-right: solid 1px #1f2d3d;
	}
	.select-item {
		width: 100%;
	}
	/* 时间选中有问题 */
	.head-container {
		.date-item {
			margin: 0 3px 10px 0;
			height: 30.5px !important;
			width: 230px !important;
		}
		/*搜索区域距离右底部*/
		.filter-item {
			display: inline-block;
			vertical-align: middle;
		}
	}
}
</style>
