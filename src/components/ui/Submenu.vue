<template>
	<el-submenu :index="'' + menu_p.id">
		<template slot="title">
			<svg-icon :icon-class="menu_p.menuIcon" class="el-input__icon" style="height: 20px; width: 20px; vertical-align: middle" />
			{{ menu_p.menuName }}
		</template>
		<template v-for="($menu, $index) in menu_p.children">
			<span :key="$index">
				<el-menu-item :index="`${$menu.id}`" :route="{ path: `/${$menu.frontendRoute ? $menu.frontendRoute.path : '404'}` }" @click.native="clickMenu($menu)">
					<svg-icon :icon-class="$menu.menuIcon" class="el-input__icon" style="height: 14px; width: 14px; vertical-align: baseline" />
					{{ $menu.menuName }}
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

<style>
</style>
