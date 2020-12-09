<template>
	<el-row>
		<el-col :span="24">
			<el-form ref="menuForm" :model="menuForm" :rules="menuRules" label-width="88px">
				<el-form-item label="名称" prop="menuName">
					<el-input v-model="menuForm.menuName" placeholder="请输入菜单名称" />
				</el-form-item>
				<el-form-item label="链接地址">
					<el-input v-model.number="menuForm.url" placeholder="请输入链接地址" />
				</el-form-item>
				<el-form-item label="排序" prop="menuSort">
					<el-input v-model.number="menuForm.menuSort" placeholder="请输入排序" />
				</el-form-item>
				<el-form-item label="图标" prop="menuIcon">
					<el-input v-model.number="menuForm.menuIcon" placeholder="请输入图标" />
				</el-form-item>
				<el-form-item label="路由名称">
					<el-input v-model.number="menuForm.routeName" placeholder="请输入路由名称" />
				</el-form-item>
				<el-form-item label="是否显示" prop="isShow">
					<el-select v-model="menuForm.isShow" placeholder="请选择" class="select-item">
						<el-option label="显示" :value="0"></el-option>
						<el-option label="不显示" :value="1"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="按钮操作类型">
					<el-select v-model="menuForm.btnType" placeholder="请选择" class="select-item">
						<el-option label="请选择" value=""></el-option>
						<el-option label="弹框" :value="0"></el-option>
						<el-option label="页签" :value="1"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="状态" prop="state">
					<el-select v-model="menuForm.state" placeholder="请选择" class="select-item">
						<el-option label="正常" :value="0"></el-option>
						<el-option label="禁用" :value="1"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="是否外链" prop="targetProperty">
					<el-select v-model="menuForm.targetProperty" placeholder="请选择" class="select-item">
						<el-option label="是" value="_blank"></el-option>
						<el-option label="否" value="_self"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="父级">
					<el-select v-model="parentName" class="select-item" placeholder="请选择" collapse-tags>
						<el-option :value="menuForm.pid" style="height: auto">
							<el-tree :data="menuData" node-key="id" ref="tree" highlight-current :props="defaultProps" @node-click="nodeClickHandler"></el-tree>
						</el-option>
					</el-select>
				</el-form-item>
			</el-form>
		</el-col>
		<el-col :span="24" style="text-align: right">
			<span class="dialog-footer">
				<el-button @click="menuFormCancel">取 消</el-button>
				<el-button type="primary" @click="menuFormSubmit">确 定</el-button>
			</span>
		</el-col>
	</el-row>
</template>

<script>
import { menuAddService, menuEditService, menuListService } from '@s/system/MenuService';
import { deleteTreeNodeById, getTreeNodeById } from '../../util/htools.tree';

export default {
	props: ['selectData_p'],
	data() {
		return {
			editId: -1,
			menuForm: {
				menuName: '',
				url: '',
				menuSort: '',
				menuIcon: '',
				isShow: 0,
				state: 0,
				pid: 0,
				routeName: '',
				targetProperty: '_self',
				btnType: ''
			},
			menuRules: {
				menuName: [
					{
						required: true,
						message: '请输入菜单名称',
						trigger: 'blur'
					}
				],
				url: [
					{
						required: true,
						message: '请输入外链',
						trigger: 'blur'
					}
				],
				menuSort: [
					{
						required: true,
						message: '请输入排序',
						trigger: 'blur'
					}
				],
				menuIcon: [
					{
						required: true,
						message: '请输入图标',
						trigger: 'blur'
					}
				],
				targetProperty: [
					{
						required: true,
						message: '请输入target属性',
						trigger: 'blur'
					}
				],
				routeName: [
					{
						required: true,
						message: '请输入路由名称',
						trigger: 'blur'
					}
				],
				state: [
					{
						required: true,
						message: '请选择菜单状态',
						trigger: 'change'
					}
				],
				btnType: [
					{
						required: true,
						message: '请选择类型',
						trigger: 'change'
					}
				],
				isShow: [
					{
						required: true,
						message: '请选择类型',
						trigger: 'change'
					}
				]
			},
			parentName: '',
			defaultProps: {
				children: 'children',
				label: 'menuName'
			},
			menuData: []
		};
	},
	watch: {
		selectData_p: {
			async handler(newValue) {
				if (newValue.length > 0) {
					this.editId = newValue[0].id;
					await this.menuList();
					getTreeNodeById(this.menuData, newValue[0].pid, node => {
						this.parentName = node.menuName;
					});
					this.menuForm = { ...newValue[0] };
				}
			},
			deep: true,
			immediate: true
		}
	},
	created() {
		this.editId === -1 && this.menuList();
	},
	methods: {
		async menuList() {
			const dataJson = {};
			const res = await menuListService(dataJson);
			if (this.editId === -1) {
				this.menuData = res;
			} else {
				this.menuData = deleteTreeNodeById(res, this.editId);
			}
		},
		menuFormSubmit() {
			this.$refs.menuForm.validate(async valid => {
				if (valid) {
					if (this.editId === -1) {
						await menuAddService(this.menuForm);
					} else {
						const dataJson = {
							id: this.editId,
							...this.menuForm
						};
						await menuEditService(dataJson);
					}
					this.$emit('update:isRefreshList_p', true);
					this.menuFormCancel();
				} else {
					this.$emit('update:isRefreshList_p', false);
				}
			});
		},
		menuFormCancel() {
			this.$emit('update:isShowAEDialog_p', false);
		},
		nodeClickHandler(data) {
			this.menuForm.pid = data.id;
			this.parentName = data.menuName;
		}
	}
};
</script>

<style>
</style>
