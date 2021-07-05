<template>
	<div class="app-container WarnDetails">
		<ul class="enterList">
			<li class="enterItem" v-if="dataObj.userName !== null">
				<span>用户：</span>
				{{ dataObj.userName }}
			</li>
			<li class="enterItem" v-if="dataObj.organizationName !== null">
				<span>所属企业：</span>
				{{ dataObj.organizationName }}
			</li>
			<li class="enterItem">
				<span>IP地址：</span>
				{{ dataObj.ipAddress }}
			</li>
			<li class="enterItem">
				<span>操作所用时长(ms)：</span>
				{{ dataObj.operteLength }}
			</li>
			<li class="enterItem">
				<span>浏览器：</span>
				{{ dataObj.browserInfo }}
			</li>
			<li class="enterItem">
				<span>操作时间：</span>
				{{ dataObj.operteDate }}
			</li>
			<li class="enterItem">
				<span>地址：</span>
				{{ dataObj.url }}
			</li>
			<li class="enterItem">
				<span>参数：</span>
				{{ dataObj.remark }}
			</li>
			<li class="enterItem" v-if="logType_p !== '3'">
				<span>返回信息：</span>
				{{ dataObj.message }}
			</li>
			<li class="enterItem" v-if="logType_p === '3'">
				<span>异常：</span>
				{{ dataObj.exception }}
			</li>
		</ul>
	</div>
</template>

<script>
import { loginLogDetailService, operateLogDetailService, errorLogDetailService } from '@s/log/logService';

export default {
	name: '',
	data() {
		return {
			dataObj: {}
		};
	},
	props: ['logId_p', 'logType_p'],
	components: {
	},
	async mounted() {
		const dataJson = {
			id: this.logId_p
		};
		let res = null;
		if (this.logType_p === '1') {
			res = await loginLogDetailService(dataJson);
		}
		if (this.logType_p === '2') {
			res = await operateLogDetailService(dataJson);
		}
		if (this.logType_p === '3') {
			res = await errorLogDetailService(dataJson);
		}
		this.dataObj = res;
	},

	methods: {}
};
</script>
<style lang='less' scoped>
.enterList {
	display: flex;
	flex-direction: row;
	// justify-content: space-between;
	flex-wrap: wrap;
	margin-bottom: 30px;
}
.enterItem {
	line-height: 40px;
	margin-right: 50px;
}
.enterItem span {
	font-weight: bold;
	color: #333;
}
</style>
