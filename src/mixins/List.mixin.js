export default {
	data() {
		return {
			// 分页
			total: 0,
			pageIndex: 1,
			pageSize: 10,
			// 表格
			tableData: [],
			selectData: [],
			// 搜索
			searchForm: {},
			editId: -1,
			isShowAEDialog: false,
			isRefreshList: false
		};
	},
	methods: {
		listMixin(res) {
			if (res.total || res.total === 0) {
				// 有分页
				this.total = res.total;
				this.tableData = res.records;
			} else {
				// 无分页
				this.tableData = res;
			}
			this.isRefreshList = false;
		},
		dialogAddHandlerMixin() {
			this.isShowAEDialog = true;
			this.selectData = [];
			this.editId = -1;
		},
		dialogEditHandlerMixin() {
			this.isShowAEDialog = true;
			this.editId = this.selectData[0].id || this.selectData[0].powerCode;
			return this.editId;
		},
		filterSelectIdsMixin() {
			return this.selectData.map(item => {
				return item.id || item.powerCode;
			});
		},
		editSingleHandlerMixin(row) {
			this.editId = row.id || row.powerCode;
			this.selectData = [row];
			this.isShowAEDialog = true;
			this.$refs.tableDom.clearSelection();
		},
		deleteSingleHandlerMixin(row) {
			this.$confirm(this.delTips || '确认此操作吗？', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			})
				.then(async () => {
					this.selectData = [row];
					this.$refs.tableDom.clearSelection();
					this.showDeleteHandler();
				})
				.catch(error => {
					console.log(error);
				});
		},
		searchFormHandlerMixin(searchForm) {
			this.pageIndex = 1;
			this.searchForm = searchForm;
		},
		lastNodesMixin(nodeArr) {
			return nodeArr.filter(item => {
				return !item.children;
			});
		}
	}
};