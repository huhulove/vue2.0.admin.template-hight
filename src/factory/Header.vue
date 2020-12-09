<template>
	<el-row>
		<el-col :span="12">
			<i class="el-icon-s-fold collapse-btn" @click="collapseHandler"></i>
		</el-col>
		<el-col :span="12" style="text-align: right; font-size: 12px">
			<el-dropdown>
				<i class="el-icon-setting" style="margin-right: 15px"></i>
				<el-dropdown-menu slot="dropdown">
					<el-dropdown-item @click.native="loginOut">退出</el-dropdown-item>
				</el-dropdown-menu>
			</el-dropdown>
			<span>{{ userName }}</span>
		</el-col>
	</el-row>
</template>

<script>
import { userDetailService } from '@s/system/UserService.js';

export default {
	props: ['isCollapse_p'],
	data() {
		return {
			userName: ''
		};
	},
	created() {
		this.userDetail();
	},
	methods: {
		collapseHandler() {
			this.$emit('update:isCollapse_p', !this.isCollapse_p);
		},
		async userDetail() {
			const dataJson = {};
			const res = await userDetailService(dataJson);
			this.userName = res.userName;
		},
		loginOut() {
			this.$store.dispatch('loginOutStore');
			this.$router.replace('/login');
		}
	}
};
</script>

<style scoped lang="less">
.collapse-btn{
	cursor: pointer;
}
</style>
