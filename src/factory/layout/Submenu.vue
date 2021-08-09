<template>
	<el-submenu :index="'' + menu_p.id">
		<template slot="title">
			<svg-icon :icon-class="menu_p.menuIcon" />
			<span class="menu-name">{{ menu_p.menuName }}</span>
		</template>
		<template v-for="($menu, $index) in menu_p.children">
			<span :key="$index">
				<template>
					<el-menu-item v-if="$menu.isOutsideLink === 0" :index="`${$menu.id}`" :route="{ path: `/${$menu.frontendRoute ? $menu.frontendRoute.path : '404'}` }">
						<svg-icon :icon-class="$menu.menuIcon" />
						<span class="menu-name">{{ $menu.menuName }}</span>
					</el-menu-item>
					<el-menu-item
						v-if="$menu.isOutsideLink === 1 && $menu.isNewWindow === 0"
						:index="`${$menu.id}`"
						:route="{ path: `/${$menu.frontendRoute.path}?url=${$menu.url}` }"
					>
						<svg-icon :icon-class="$menu.menuIcon" />
						<span class="menu-name">{{ $menu.menuName }}</span>
					</el-menu-item>
					<div v-if="$menu.isOutsideLink === 1 && $menu.isNewWindow === 1" class="el-menu el-menu--inline">
						<a class="el-menu-item menu-item" :href="$menu.url" target="_blank">
							<svg-icon :icon-class="$menu.menuIcon" />
							<span class="menu-name">{{ $menu.menuName }}</span>
						</a>
					</div>
				</template>
				<Submenu v-if="$menu.children && $menu.children.length !== 0" :menu_p="$menu"></Submenu>
			</span>
		</template>
	</el-submenu>
</template>

<script>
import { hsetStorage } from '@/util/htools.web';

export default {
	name: 'Submenu',
	props: ['menu_p'],
	data() {
		return {};
	},
	methods: {
		clickMenu(menu) {
			hsetStorage('btnAuthorizeCodes', menu.authorizeCodes);
		}
	}
};
</script>

<style scoped lang="less">
.menu-name {
	padding-left: 12px;
}
.el-input__icon {
	height: 16px;
	width: 16px;
	vertical-align: middle;
	&.big {
		height: 20px;
		width: 20px;
	}
}
</style>
