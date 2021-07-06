<template>
	<el-row>
		<el-col :span="12">
			<i class="el-icon-s-fold collapse-btn" @click="collapseHandler" style="font-size: 20px"></i>
		</el-col>
		<el-col :span="12" style="text-align: right">
			<el-dropdown>
				<i class="el-icon-setting" style="margin-right: 15px; font-size: 20px; color: #bfcbd9"></i>
				<el-dropdown-menu slot="dropdown">
					<el-dropdown-item>
						<router-link to="/system/profile">个人信息</router-link>
					</el-dropdown-item>
					<el-dropdown-item @click.native="loginOut">退出</el-dropdown-item>
				</el-dropdown-menu>
			</el-dropdown>
			<span style="font-size: 16px">{{ nickName || userName }}</span>
		</el-col>
	</el-row>
</template>

<script>
// eslint-disable-next-line import/named
import { userLoginDetailService } from '@s/system/UserService.js';
import { hsetStorage } from '@u/htools.web.js';

export default {
	props: ['isCollapse_p'],
	data() {
		return {
			nickName: '',
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
			const res = await userLoginDetailService(dataJson);
			this.nickName = res.nickName;
			this.userName = res.userName;
			hsetStorage('powers', res.powers);
			hsetStorage('roleIds', res.userRoles);
		},
		loginOut() {
			this.$store.dispatch('loginOutStore');
			this.$router.replace('/login');
		}
	}
};
</script>

<style scoped lang="less">
.collapse-btn {
	cursor: pointer;
}
.el-dropdown {
	height: 34px;
}
</style>
