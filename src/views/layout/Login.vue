<template>
	<div class="login-container">
		<DataForm class="login-form" ref="formEle" :model="formData" :rules="formRules" :labelWidth_p="'0px'">
			<div class="title-container">
				<h3>管理后台</h3>
			</div>
			<el-form-item prop="userName">
				<Input v-model="formData.userName" placeholder="请输入用户名" />
			</el-form-item>
			<el-form-item prop="userPwd">
				<Input v-model="formData.userPwd" type="password" placeholder="请输入密码" />
			</el-form-item>
			<template slot="footer">
				<el-button class="login-button" :loading="loading" type="primary" @click.native.prevent="handleLogin">登录</el-button>
			</template>
		</DataForm>
	</div>
</template>

<script>
import DataForm from '@c/ui/DataForm';
import Input from '@c/ui/Input';

export default {
	name: 'Login',
	components: {
		DataForm,
		Input
	},
	data() {
		return {
			formData: {
				userName: '',
				userPwd: ''
			},
			formRules: {
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
	mounted() {
		document.onkeydown = () => {
			const key = window.event.keyCode;
			if (key === 13) {
				this.handleLogin();
			}
		};
	},
	methods: {
		handleLogin() {
			this.$refs.formEle.$refs.formEle.validate(async valid => {
				if (valid) {
					this.loading = true;
					try {
						await this.$store.dispatch('loginStore', this.formData);
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
	background: url(../../assets/login_bg.jpg) no-repeat;
	.login-form {
		position: relative;
		width: 520px;
		max-width: 100%;
		padding: 160px 35px 0;
		margin: 0 auto;
		overflow: hidden;
		.title-container {
			position: relative;
			h3 {
				font-size: 26px;
				color: #fff;
				margin: 0px auto 40px auto;
				text-align: center;
				font-weight: bold;
			}
		}
		.login-button {
			width: 100%;
			margin-bottom: 30px;
		}
	}
}
</style>
