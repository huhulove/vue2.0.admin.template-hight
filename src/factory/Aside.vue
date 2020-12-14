<template>
	<el-aside class="sidebar-container">
		<el-menu class="el-menu-vertical-demo" router :default-openeds="['1']" :collapse="isCollapse_p">
			<template>
				<span v-for="(menu, index) in menuData" :key="index">
					<Submenu :menu_p="menu" v-if="menu.children && menu.children.length !== 0"></Submenu>
					<el-menu-item v-if="!menu.children || menu.children.length === 0" :route="{ path: `/${menu.frontendRoute.path}` }" :index="`${menu.id}`">
						{{ menu.menuName }}
					</el-menu-item>
				</span>
			</template>
			<!-- <el-submenu index="2">
				<template slot="title">
					<i class="el-icon-message"></i>
					日志管理
				</template>
				<el-menu-item index="2-1" :route="{ path: '/log/system' }">系统日志</el-menu-item>
			</el-submenu>
			<el-submenu index="3">
				<template slot="title">
					<i class="el-icon-message"></i>
					基础数据管理
				</template>
				<el-menu-item index="3-1">省市区管理</el-menu-item>
			</el-submenu> -->
		</el-menu>
	</el-aside>
</template>

<script>
import Submenu from '@c/ui/Submenu.vue';
import { userMenuAuthorizeService } from '@s/system/UserService';
import { mergeRoutes } from '../util/index';

export default {
	props: ['isCollapse_p'],
	components: {
		Submenu
	},
	data() {
		return {
			menuData: null
		};
	},
	created() {
		this.menuAuthorizeList();
	},
	watch: {
		$route: {
			handler() {}
		},
		'$store.state.userStore.isRefreshAside': {
			handler(newValue) {
				newValue && this.menuAuthorizeList();
				this.$store.commit('setRefreshAside', false);
			}
		}
	},
	methods: {
		clickMenu(menu) {
			hsetStorage('btnPowers', menu.powers);
		},
		async menuAuthorizeList() {
			const res = await userMenuAuthorizeService({});
			this.menuData = mergeRoutes(res);
		}
	}
};
</script>

<style lang="less">
.el-menu-vertical-demo:not(.el-menu--collapse) {
	width: 200px;
	min-height: 400px;
}
.sidebar-container {
	color: #333;
	background: #304156;
	white-space: nowrap;
	width: auto !important;
	.el-menu {
		background: transparent;
		color: rgb(191, 203, 217);
	}
	.el-menu-item {
		background-color: #1f2d3d !important;
		color: rgb(191, 203, 217);
		&:hover {
			background-color: #001528 !important;
		}
		&.is-active {
			color: #409eff !important;
		}
	}
	/deep/ .el-submenu__title {
		color: rgb(191, 203, 217);
		background-color: #1f2d3d !important;
		&:hover {
			background-color: #263445 !important;
		}
	}
	.el-menu--collapse {
		i {
			margin-right: 17px !important;
		}
	}
	.is-active > .el-submenu__title {
		color: #f4f4f5 !important;
	}
}
</style>
