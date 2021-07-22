<template>
	<el-row :gutter="30">
		<el-col :span="5">
			<Card class="box-card left_container">
				<div class="avatar">
					<el-avatar shape="circle" :size="120" :src="profileData.avatar"></el-avatar>
					<Upload class="avatar-uploader" :action="uploadImgAction" :show-file-list="false" :on-success="handleSuccess">
						<i slot="uploadButton" class="el-icon-edit"></i>
					</Upload>
				</div>
				<div class="name">{{ profileData.nickName }}</div>
				<div class="progress">
					<el-row>
						<el-col :span="12" class="label">个人信息完整度</el-col>
						<el-col :span="12" class="value">{{ percentage }}%</el-col>
					</el-row>
					<el-progress :percentage="percentage" :show-text="false"></el-progress>
				</div>
				<div class="menu">
					<ul>
						<li v-for="(item, index) in menuData" :key="item.id" :class="[activeIndex === index ? 'active' : '']" @click="menuChangeHandler(index)">
							<i :class="item.icon"></i>
							<span>{{ item.name }}</span>
						</li>
					</ul>
				</div>
			</Card>
		</el-col>
		<el-col :span="19">
			<Card class="box-card">
				<div slot="header" class="clearfix">
					<span>{{ menuData[activeIndex].label }}</span>
				</div>
				<UserProfile v-if="activeIndex === 0"></UserProfile>
				<UserPassword v-if="activeIndex === 1" :isHideCancel_p="true" @submitCallback="loginOut"></UserPassword>
			</Card>
		</el-col>
	</el-row>
</template>

<script>
import Card from '@c/ui/Card';
import Upload from '@c/ui/Upload';

import UserPassword from '@f/systemManager/user/UserPassword.form';
import UserProfile from '@f/systemManager/user/UserProfile.form';

// eslint-disable-next-line import/no-cycle
import { userLoginDetailService, userEditAvatarService } from '@s/systemManager/UserService.js';

export default {
	components: {
		UserPassword,
		UserProfile,
		Card,
		Upload
	},
	data() {
		return {
			profileData: {},
			menuData: [
				{
					id: 1,
					icon: 'el-icon-user',
					name: '基本信息',
					label: '基本信息'
				},
				{
					id: 2,
					icon: 'el-icon-setting',
					name: '修改密码',
					label: '修改密码'
				}
			],
			activeIndex: 0,
			percentage: 0,
			stage: 14,
			uploadImgAction: 'http://www.huhulove.com/api/upload/img'
		};
	},
	created() {
		this.percentage = this.stage;
	},
	mounted() {
		this.userDetail();
	},
	methods: {
		async userDetail() {
			const dataJson = {};
			const res = await userLoginDetailService(dataJson);
			this.profileData = { ...res };
			if (res.nickName) {
				this.percentage += this.stage;
			}
			if (res.sex) {
				this.percentage += this.stage;
			}
			if (res.birthday) {
				this.percentage += this.stage;
			}
			if (res.email) {
				this.percentage += this.stage;
			}
			if (res.phone) {
				this.percentage += this.stage;
			}
			if (res.avatar) {
				this.percentage += this.stage;
			}
			if (this.percentage > 100 - this.stage - 1) {
				this.percentage = 100;
			}
		},
		async handleSuccess(res) {
			const { result } = res;
			const dataJson = {
				avatar: result
			};
			await userEditAvatarService(dataJson);
			this.profileData.avatar = result;
		},
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
