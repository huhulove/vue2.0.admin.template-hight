<template>
	<el-aside class="sidebar-container">
		<el-menu class="el-menu-vertical-demo" router :default-openeds="defaultOpeneds" :default-active="defaultActive" :collapse="isCollapse_p" :unique-opened="true">
			<template v-for="(menu, index) in menuData">
				<span :key="index">
					<Submenu :menu_p="menu" v-if="menu.children && menu.children.length !== 0"></Submenu>
					<el-menu-item
						v-if="!menu.children || menu.children.length === 0"
						:route="{ path: `/${menu.frontendRoute ? menu.frontendRoute.path : '404'}` }"
						:index="`${menu.id}`"
					>
						{{ menu.menuName }}
					</el-menu-item>
				</span>
			</template>
		</el-menu>
	</el-aside>
</template>

<script>
import Submenu from '@c/ui/Submenu.vue';
import { userMenuAuthorizeService } from '@s/system/UserService';
import { mergeRoutes } from '@u/index';
import { hsetStorage } from '@u/htools.web';
import { getTreePNodeByNodeId } from '@u/htools.tree';

export default {
	props: ['isCollapse_p'],
	components: {
		Submenu
	},
	data() {
		return {
			menuData: null,
			defaultOpeneds: [],
			defaultActive: ''
		};
	},
	async created() {
		await this.menuAuthorizeList();
		this.autoActiveMenu();
	},
	watch: {
		'$store.state.userStore.isRefreshAside': {
			handler(newValue) {
				newValue && this.menuAuthorizeList();
				this.$store.commit('setRefreshAside', false);
			}
		},
		$route: {
			handler() {
				this.autoActiveMenu();
			}
		}
	},
	methods: {
		autoActiveMenu() {
			let routeName = null;
			let isMenuFlag = null;
			if (!this.$route.meta.aside) {
				isMenuFlag = 1; // 类型是菜单
			} else {
				const { isMenu, activedRouteName } = this.$route.meta.aside;
				if (isMenu === undefined || isMenu) {
					isMenuFlag = 1;
				} else if (!activedRouteName) {
					isMenuFlag = 0;
				} else {
					isMenuFlag = 2;
				}
			}
			if (isMenuFlag === 1) {
				routeName = this.$route.name;
			} else if (isMenuFlag === 2) {
				const { activedRouteName } = this.$route.meta.aside;
				routeName = activedRouteName;
			} else if (isMenuFlag === 0) {
				routeName = '';
			}
			if (routeName) {
				getTreePNodeByNodeId(this.menuData, routeName, null, (node, pNode) => {
					hsetStorage('btnPowers', node.powers);
					this.defaultActive = `${node.id}`;
					this.defaultOpeneds.push(`${pNode.id}`);
				});
			} else {
				this.defaultActive = '';
				this.defaultOpeneds = [];
			}
		},
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
	/* width: 219px !important; */
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
