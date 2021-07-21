<template>
	<el-submenu :index="'' + menu_p.id">
		<template slot="title">
			<svg-icon :icon-class="menu_p.menuIcon" class="el-input__icon big" />
			<span class="menu-name">{{ menu_p.menuName }}</span>
		</template>
		<template v-for="($menu, $index) in menu_p.children">
			<span :key="$index">
				<el-menu-item :index="`${$menu.id}`" :route="{ path: `/${$menu.frontendRoute ? $menu.frontendRoute.path : '404'}` }" @click.native="clickMenu($menu)">
					<svg-icon :icon-class="$menu.menuIcon" class="el-input__icon" />
					<span class="menu-name">{{ $menu.menuName }}</span>
				</el-menu-item>
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
			hsetStorage('btnPowers', menu.powers);
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
