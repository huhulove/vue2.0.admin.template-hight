<template>
	<el-row>
		<el-col :span="24">
			<el-form ref="authorizeForm" :model="authorizeForm" :rules="authorizeRules" label-width="66px">
				<el-form-item label="名称" prop="powerName">
					<el-input v-model="authorizeForm.powerName" placeholder="请输入权限名称" />
				</el-form-item>
				<el-form-item label="标识" prop="powerCode">
					<el-input v-model.number="authorizeForm.powerCode" placeholder="请输入权限标识" />
				</el-form-item>
				<el-form-item label="状态" prop="state">
					<el-radio-group style="width: 200px" v-model="authorizeForm.state">
						<el-radio :label="0">正常</el-radio>
						<el-radio :label="1">禁用</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="父级">
					<el-select v-model="parentName" class="select-item" placeholder="请选择" collapse-tags>
						<el-option :value="authorizeForm.parentId" style="height: auto">
							<el-tree
								:data="authorizeData"
								node-key="powerCode"
								ref="tree"
								highlight-current
								:props="defaultProps"
								@node-click="nodeClickHandler"
							></el-tree>
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="备注">
					<el-input type="textarea" :rows="4" v-model.number="authorizeForm.remark" placeholder="请输入备注" />
				</el-form-item>
			</el-form>
		</el-col>
		<el-col :span="24" style="text-align: right">
			<span class="dialog-footer">
				<el-button @click="authorizeFormCancel">取 消</el-button>
				<el-button type="primary" @click="authorizeFormSubmit">确 定</el-button>
			</span>
		</el-col>
	</el-row>
</template>

<script>
import { authorizeAddService, authorizeEditService, authorizeListService } from '@s/system/AuthorizeService';
import { getTreeNodeById } from '@u/htools.tree';

export default {
	props: ['selectData_p'],
	data() {
		return {
			editId: -1,
			authorizeForm: {
				powerName: '',
				state: 0,
				remark: '',
				powerCode: '',
				parentId: 0
			},
			authorizeRules: {
				powerName: [
					{
						required: true,
						message: '请输入权限名称',
						trigger: 'blur'
					}
				],
				powerCode: [
					{
						required: true,
						message: '请输入权限标识',
						trigger: 'blur'
					}
				],
				state: [
					{
						required: true,
						message: '请选择权限状态',
						trigger: 'change'
					}
				],
				parentId: [
					{
						required: true,
						message: '请选择权限父级',
						trigger: 'blur'
					}
				]
			},
			parentName: '',
			defaultProps: {
				children: 'children',
				label: 'powerName'
			},
			authorizeData: []
		};
	},
	watch: {
		selectData_p: {
			async handler(newValue) {
				if (newValue.length > 0) {
					this.editId = newValue[0].powerCode;
                    /* this.parentName = newValue[0].powerName; */
                    await this.authorizeList();
					getTreeNodeById(this.authorizeData, newValue[0].parentId, node => {
                        this.parentName = node.powerName;
					});
					this.authorizeForm = { ...newValue[0] };
				}
			},
			deep: true,
			immediate: true
		}
	},
	created() {
		this.editId === -1 && this.authorizeList();
	},
	methods: {
		async authorizeList() {
			const dataJson = {};
			const res = await authorizeListService(dataJson);
			this.authorizeData = res;
		},
		authorizeFormSubmit() {
			this.$refs.authorizeForm.validate(async valid => {
				if (valid) {
					if (this.editId === -1) {
						await authorizeAddService(this.authorizeForm);
					} else {
						const dataJson = {
							id: this.editId,
							...this.authorizeForm
						};
						await authorizeEditService(dataJson);
					}
					this.$emit('update:isRefreshList_p', true);
					this.authorizeFormCancel();
				} else {
					this.$emit('update:isRefreshList_p', false);
				}
			});
		},
		authorizeFormCancel() {
			this.$emit('update:isShowAEDialog_p', false);
		},
		nodeClickHandler(data) {
			this.authorizeForm.parentId = data.powerCode;
			this.parentName = data.powerName;
		}
	}
};
</script>

<style>
</style>
