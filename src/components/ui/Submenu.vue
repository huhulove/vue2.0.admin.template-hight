<template>
	<el-submenu :index="'' + menu_p.id">
		<template slot="title">
			<i class="el-icon-message"></i>
			{{ menu_p.menuName }}
		</template>
		<template v-for="($menu, $index) in menu_p.children">
			<span :key="$index">
				<el-menu-item :index="`${$menu.id}`" :route="{ path: `/${$menu.frontendRoute.path}` }" @click.native="clickMenu($menu)">
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
