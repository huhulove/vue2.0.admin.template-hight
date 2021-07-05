<template>
	<el-container class="layout-container">
		<Aside :isCollapse_p="isCollapse"></Aside>
		<el-container style="margin-left: -17px; z-index: 1111">
			<el-header>
				<MHeader :isCollapse_p.sync="isCollapse"></MHeader>
			</el-header>
			<Tab></Tab>
			<el-main style="position:relative; background:#fff">
				<router-view></router-view>
			</el-main>
		</el-container>
	</el-container>
</template>

<script>
import Aside from '../factory/Aside';
import Tab from '../factory/Tab';
import MHeader from '../factory/Header';

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
