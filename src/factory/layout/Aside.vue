<template>
	<el-aside class="sidebar-container" :style="{ width: `${width_p} !important` }">
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
import { hsetStorage } from '@u/htools.web';
import { getTreePNodeByNodeId } from '@u/htools.tree';
import { mergeRoutes } from '@u/index';
import { userMenuAuthorizeService } from '@s/systemManager/UserService';
import Submenu from './Submenu.vue';

export default {
	props: ['isCollapse_p', 'width_p'],
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
					hsetStorage('btnAuthorizeCodes', node.authorizeCodes);
					this.defaultActive = `${node.id}`;
					this.defaultOpeneds = [];
					if (pNode) {
						this.defaultOpeneds = [];
						this.defaultOpeneds.push(`${pNode.id}`);
					}
				});
			} else {
				this.defaultActive = '';
				this.defaultOpeneds = [];
			}
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
	white-space: nowrap;
	transition: all .5s;
	.el-menu--collapse {
		i {
			margin-right: 17px !important;
			display: none;
		}
	}
}
</style>
