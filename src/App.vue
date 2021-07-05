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
		/* left: 200px; */
		left: 184px;
		top: 95px;
	}
	.el-menu {
		border-right: solid 1px #1f2d3d;
	}
	.select-item, .input-item {
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
	.head-serch {
		display: flex;
		align-items: center;
		.form {
			margin-right: 10px;
		}
		.el-form-item {
			margin-bottom: 3px;
		}
	}
	li{
		list-style: none;
	}
}
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}
// 火狐兼容问题
.sidebar-container .el-submenu__title{
	color: #bfcbd9;
    background-color: #1f2d3d !important;
}
.el-table .cell {
	min-height: 32px;
	line-height: 30px;
}
// 菜单添加选择父级的弹窗背景色
.el-select-dropdown__item.hover{
	background-color: #fff;
}
// viewer 图片放大弹窗层级
// .v-modal{
// 	z-index: 3000!important;
// }
.viewer-transition{
	z-index: 9999!important;
}
.viewer-canvas{z-index: 99999!important;}
// a链接的样式
a{ text-decoration:none} 
</style>
