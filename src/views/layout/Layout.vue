<template>
	<el-container class="layout-container">
		<Aside :isCollapse_p="isCollapse" :width_p="asideWidth"></Aside>
		<el-container style="margin-left: -17px; z-index: 1111;" :style="{ width: `calc(100vw - ${asideWidth})` }">
			<el-header>
				<MHeader :isCollapse_p.sync="isCollapse"></MHeader>
			</el-header>
			<Tab></Tab>
			<el-main style="position: relative; background: #fff">
				<router-view></router-view>
			</el-main>
		</el-container>
	</el-container>
</template>

<script>
import Aside from '@f/layout/Aside';
import Tab from '@f/layout/Tab';
import MHeader from '@f/layout/Header';

export default {
	name: 'layout',
	components: {
		Aside,
		Tab,
		MHeader
	},
	data() {
		return {
			isCollapse: false
		};
	},
	computed: {
		asideWidth() {
			return !this.isCollapse ? '220px' : '68px';
		}
	}
};
</script>

<style scoped lang="less">
.layout-container {
	height: calc(100%);
}
.el-header {
	background-color: #304156;
	color: #bfcbd9;
	line-height: 60px;
}
</style>
