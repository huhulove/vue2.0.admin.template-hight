<template>
	<div class="login-container">
		<el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">
			<div class="title-container">
				<h3 class="title">通用后台框架</h3>
			</div>
			<el-form-item prop="userName">
				<el-input ref="userName" v-model="loginForm.userName" placeholder="userName" name="username" type="text" tabindex="1" auto-complete="on" />
			</el-form-item>
			<el-form-item prop="userPwd">
				<el-input
					key="userPwd"
					ref="userPwd"
					v-model="loginForm.userPwd"
					type="password"
					placeholder="Password"
					name="userPwd"
					tabindex="2"
					auto-complete="on"
					@keyup.enter.native="handleLogin"
				/>
			</el-form-item>
			<el-button :loading="loading" type="primary" style="width: 100%; margin-bottom: 30px" @click.native.prevent="handleLogin">Login</el-button>
		</el-form>
	</div>
</template>

<script>
export default {
	name: 'Login',
	data() {
		return {
			loginForm: {
				userName: 'admin',
				userPwd: '123456'
			},
			loginRules: {
				userName: [{ required: true, trigger: 'blur', message: '请输入用户名' }],
				userPwd: [{ required: true, trigger: 'blur', message: '请输入密码' }]
			},
			loading: false,
			redirect: undefined
		};
	},
	watch: {
		$route: {
			handler(route) {
				this.redirect = route.query && route.query.redirect;
			},
			immediate: true
		}
	},
	methods: {
		handleLogin() {
			this.$refs.loginForm.validate(async valid => {
				if (valid) {
					this.loading = true;
					try {
						await this.$store.dispatch('loginStore', this.loginForm);
						this.$router.push({ path: this.redirect || '/' });
						this.loading = false;
					} catch (error) {
						this.loading = false;
					}
				} else {
					console.log('error submit!!');
					return false;
				}
			});
		}
	}
};
</script>

<style lang="less" scoped>
.login-container {
	min-height: 100%;
	width: 100%;
	background-color: #2d3a4b;
	overflow: hidden;
	.login-form {
		position: relative;
		width: 520px;
		max-width: 100%;
		padding: 160px 35px 0;
		margin: 0 auto;
		overflow: hidden;
	}
	.tips {
		font-size: 14px;
		color: #fff;
		margin-bottom: 10px;
		span {
			&:first-of-type {
				margin-right: 16px;
			}
		}
	}
	.title-container {
		position: relative;
		.title {
			font-size: 26px;
			color: #fff;
			margin: 0px auto 40px auto;
			text-align: center;
			font-weight: bold;
		}
	}
	.show-pwd {
		position: absolute;
		right: 10px;
		top: 7px;
		font-size: 16px;
		color: #fff;
		cursor: pointer;
		user-select: none;
	}
}
</style>
