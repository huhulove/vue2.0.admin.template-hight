<template>
	<el-row :gutter="30">
		<el-col :span="5">
			<el-card class="box-card left_container" shadow="never">
				<div class="avatar">
					<el-avatar shape="circle" :size="120" :src="profileData.avatar"></el-avatar>
					<el-upload class="avatar-uploader" :action="uploadImgAction" :show-file-list="false" :on-success="handleSuccess">
						<i class="el-icon-edit"></i>
					</el-upload>
				</div>
				<div class="name">{{ profileData.nickName }}</div>
				<div class="progress">
					<el-row>
						<el-col :span="12" class="label">个人信息完整度</el-col>
						<el-col :span="12" class="value">75%</el-col>
					</el-row>
					<el-progress :percentage="70" :show-text="false"></el-progress>
				</div>
				<div class="menu">
					<ul>
						<li :class="[activeIndex === 0 ? 'active' : '']" @click="menuChangeHandler(0)">
							<i class="el-icon-user"></i>
							<span>基本信息</span>
						</li>
						<li :class="[activeIndex === 1 ? 'active' : '']" @click="menuChangeHandler(1)">
							<i class="el-icon-setting"></i>
							<span>修改密码</span>
						</li>
					</ul>
				</div>
			</el-card>
		</el-col>
		<el-col :span="19">
			<el-card class="box-card" shadow="never">
				<div slot="header" class="clearfix">
					<span>{{ activeIndex === 0 ? '基本信息' : activeIndex === 1 ? '修改密码' : '' }}</span>
				</div>
				<UserProfile v-if="activeIndex === 0"></UserProfile>
				<UserPassword v-if="activeIndex === 1" :isHideCancel_p="true" @submitCallback="loginOut"></UserPassword>
			</el-card>
		</el-col>
	</el-row>
</template>

<script>
import UserPassword from '@f/system/user/UserPassword.form';
import UserProfile from '@f/system/user/UserProfile.form';

// eslint-disable-next-line import/no-cycle
import { userLoginDetailService } from '@s/system/UserService.js';

export default {
	components: {
		UserPassword,
		UserProfile
	},
	data() {
		return {
			profileData: {},
			activeIndex: 0,
			uploadImgAction: 'http://www.huhulove.com/api/upload/img'
		};
	},
	mounted() {
		this.userDetail();
	},
	methods: {
		async userDetail() {
			const dataJson = {};
			const res = await userLoginDetailService(dataJson);
			this.profileData = { ...res };
		},
		handleSuccess() {},
		menuChangeHandler(index) {
			this.activeIndex = index;
		},
		loginOut() {
			this.$store.dispatch('loginOutStore');
			this.$router.replace('/login');
		}
	}
};
</script>

<style lang="less">
.left_container {
	text-align: center;
	.avatar {
		position: relative;
		margin: 10px auto 0;
		width: 120px;
		.avatar-uploader {
			position: absolute;
			bottom: 10px;
			right: 10px;
			background: #66b1ff;
			color: #fff;
			border-radius: 50%;
			width: 30px;
			height: 30px;
			text-align: center;
			line-height: 30px;
			.el-upload {
				border: none;
				.el-icon-edit {
					color: #fff !important;
				}
			}
		}
	}
	.name {
		color: #606266;
		font-size: 18px;
		margin-top: 24px;
	}
	.progress {
		font-size: 14px;
		color: #909399;
		margin-top: 56px;
		.label {
			text-align: left;
			margin-bottom: 6px;
		}
		.value {
			text-align: right;
			margin-bottom: 14px;
		}
	}
	.menu {
		margin-top: 50px;
		li {
			border-top: 1px solid #dcdfe6;
			padding: 18px 0;
			font-size: 16px;
			color: #909399;
			text-align: left;
			i {
				padding: 0 10px;
			}
			&.active,
			&:hover {
				i,
				span {
					color: #409eff;
				}
				cursor: pointer;
			}
		}
	}
}
</style>
