<template>
	<el-submenu index="1">
		<template slot="title">
			<i class="el-icon-message"></i>
			{{ menu_p.menuName }}
		</template>
		<span v-for="($menu, $index) in menu_p.children" :key="$index">
			<el-menu-item index="1-1" :route="{ path: '/system/userManager' }">{{ $menu.menuName }}</el-menu-item>
			<Submenu v-if="$menu.children && $menu.children.length !== 0" :menu_p="$menu"></Submenu>
		</span>
	</el-submenu>
</template>

<script>
export default {
	name: 'Submenu',
	props: ['menu_p'],
	data() {
		return {};
	}
};
</script>

<style>
</style>
