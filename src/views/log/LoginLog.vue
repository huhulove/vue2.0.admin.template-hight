<template>
	<div>
		<div class="search">
			<el-date-picker
				v-model="date"
				type="datetimerange"
				range-separator="至"
				start-placeholder="开始日期"
				end-placeholder="结束日期"
				value-format="yyyy-MM-dd HH:mm:ss"
			></el-date-picker>
			<el-button class="filter-item" size="mini" type="success" icon="el-icon-search" @click="searchHandler">搜索</el-button>
		</div>

		<div>
			<Table ref="tableDom" :data.sync="tableData" :tableColumn_p="tableColumn" :isHideCheckbox_p="true">
				<el-table-column label="返回信息">
					<template slot-scope="scope">
						<span class="overFlow">{{ scope.row.message }}</span>
					</template>
				</el-table-column>
				<el-table-column label="浏览器">
					<template slot-scope="scope">
						<span class="overFlow">{{ scope.row.browserInfo }}</span>
					</template>
				</el-table-column>
				<el-table-column label="登录时间" width="150">
					<template slot-scope="scope">
						<span>{{ scope.row.operteDate }}</span>
					</template>
				</el-table-column>
				<el-table-column label="操作" width="110">
					<template slot-scope="scope">
						<el-button @click="getLogDetail(scope.row)" type="primary">查看详情</el-button>
					</template>
				</el-table-column>
			</Table>
			<Pagination :total="total" :pageIndex_p.sync="dataJson.pageNum" :pageSize_p.sync="dataJson.pageSize"></Pagination>
		</div>
		<Dialog title="日志详情" :visible.sync="isShowLog" width="70%">
			<LogDetail v-if="isShowLog" :logId_p="logId" logType_p=1></LogDetail>
		</Dialog>
	</div>
</template>

<script>
// eslint-disable-next-line import/no-cycle
import { loginLogService } from '@s/log/logService';
import Table from '@c/ui/Table';
import Pagination from '@c/ui/Pagination';
import Dialog from '@c/ui/Dialog';
import LogDetail from '@f/log/logDetail';
import { htimeFormat } from '@u/htools.web.js';

export default {
	data() {
		return {
			date: [],
			dataJson: {
				logStartDate: null,
				logEndDate: null, // 日志操作时间
				pageNum: 1,
				pageSize: 10
			},
			tableData: [], // 日志数据
			total: 0,
			tableColumn: [
				// {
				// 	label: '操作人',
				// 	field: 'userName',
				// 	width: '100'
				// },
				// {
				// 	label: '所属企业',
				// 	field: 'organizationName',
				// 	width: '200'
				// },
				{
					label: 'IP地址',
					field: 'ipAddress',
					width: '120'
				},
				{
					label: '操作所用时长(ms)',
					field: 'operteLength',
					width: '80'
				},
				{
					label: '参数',
					field: 'remark'
				}
			],
			isShowLog: false,
			logId: ''
		};
	},
	components: {
		Table,
		Pagination,
		Dialog,
		LogDetail
	},
	mounted() {
		this.getLog();
	},
	methods: {
		// 获取日志列表
		async getLog() {
			if (this.date != null && this.date.length > 0) {
				const date1 = new Date(this.date[0]);
				const date2 = new Date(this.date[1]);
				this.dataJson.logStartDate = htimeFormat(date1, '{y}-{m}-{d} {h}:{i}:{s}');
				this.dataJson.logEndDate = htimeFormat(date2, '{y}-{m}-{d} {h}:{i}:{s}');
				// this.dataJson.logStartDate = `${date1.getFullYear()}-${date1.getMonth() + 1}-${date1.getDate()}`;
				// this.dataJson.logEndDate = `${date2.getFullYear()}-${date2.getMonth() + 1}-${date2.getDate()}`;
			} else {
				this.dataJson.logStartDate = null;
				this.dataJson.logEndDate = null;
			}
			const res = await loginLogService(this.dataJson);
			this.tableData = res.records;
			this.total = res.total;
		},
		// 搜索
		searchHandler() {
			this.dataJson.pageNum = 1;
			this.dataJson.pageSize = 10;
			this.getLog();
		},
		// 日志详情
		getLogDetail(row) {
			this.logId = row.id;
			this.isShowLog = true;
		}
	},
	watch: {
		'dataJson.pageNum'(newValue) {
			this.pageIndex = newValue;
			this.getLog();
		},
		'dataJson.pageSize'(newValue) {
			this.pageSize = newValue;
			this.getLog();
		}
	}
};
</script>

<style scoped>
.search {
	display: flex;
	align-items: center;
	margin: 30px 0;
}
.filter-item {
	margin: 0 30px;
}
.overFlow {
	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
}
</style>
