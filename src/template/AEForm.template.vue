<template>
	<el-form ref="hospitalLevelForm" :model="hospitalLevelForm" :rules="hospitalLevelRules" size="small" label-width="130px">
		<el-form-item label="企业" prop="organizationId">
			<el-select v-model="hospitalLevelForm.organizationId" placeholder="请选择" class="select-item" :disabled="orgDisabled" clearable filterable>
				<el-option v-for="(enterprise, index) in enterpriseData" :key="index" :label="enterprise.organizationName" :value="enterprise.id"></el-option>
			</el-select>
		</el-form-item>
		<el-form-item label="名称" prop="equipment">
			<el-input v-model="hospitalLevelForm.equipment" placeholder="请输入名称" />
		</el-form-item>
		<el-form-item label="主要耗能" prop="energy">
			<el-select v-model="hospitalLevelForm.energy" placeholder="请选择" class="select-item">
				<el-option v-for="(item, index) in energyData" :key="index" :label="item.name" :value="item.id"></el-option>
			</el-select>
		</el-form-item>
		<el-form-item label="开机能耗" prop="electricityAfter">
			<el-input type="number" v-model="hospitalLevelForm.electricityAfter" placeholder="请输入开机耗电量" />
		</el-form-item>
		<el-form-item label="待机能耗" prop="electricityFront">
			<el-input type="number" v-model="hospitalLevelForm.electricityFront" placeholder="请输入待机耗电量" />
		</el-form-item>
		<el-form-item label="设备类型" prop="codeId">
			<el-select v-model="hospitalLevelForm.codeId" placeholder="请选择" class="select-item">
				<el-option v-for="(item, index) in equipmentCodeData" :key="index" :label="item.equipmentName" :value="item.id"></el-option>
			</el-select>
		</el-form-item>
		<el-form-item label="生产工艺" prop="processId">
			<el-select v-model="hospitalLevelForm.processId" placeholder="请选择" class="select-item">
				<el-option
					v-for="(item, index) in productionProcessData"
					:key="index"
					:label="item.productionProcessName"
					:value="item.id"
				></el-option>
			</el-select>
		</el-form-item> 
		<el-form-item>
			<div style="text-align: right">
				<span class="dialog-footer">
					<el-button @click="hospitalLevelFormCancel">取 消</el-button>
					<el-button type="primary" @click="hospitalLevelFormSubmit">确 定</el-button>
				</span>
			</div>
		</el-form-item>
	</el-form>
</template>

<script>
import { hospitalLevelAddService, hospitalLevelEditService, hospitalLevelDetailService } from '@s/base/HospitalLevelService';
// import { enterpriseListService } from '@s/base/EnterpriseService';
// // eslint-disable-next-line import/no-cycle
// import { equipmentCodeListService } from '@s/base/EquipmentCodeService';
// // eslint-disable-next-line import/no-cycle
// import { productionProcessListService } from '@s/base/ProductionProcessService';
// // eslint-disable-next-line import/no-cycle
// import { energyConsumptionListService } from '@s/base/EnergyConsumptionService';
import { hgetStorage } from '@/util/htools.web';

export default {
	props: ['selectData_p', 'editId_p'],
	data() {
		return {
			editId: -1,
			hospitalLevelForm: {
				organizationId: '',
				electricityAfter: 0,
				electricityFront: 0,
				codeId: '',
				processId: '',
				energy: '',
				equipment: '',
				isDel: 0
			},
			hospitalLevelRules: {
				equipment: [
					{
						required: true,
						message: '请输入名称',
						trigger: 'blur'
					}
				],
				codeId: [
					{
						required: true,
						message: '请选择设备类型',
						trigger: 'blur'
					}
				],
				processId: [
					{
						required: true,
						message: '请选择生产工艺',
						trigger: 'blur'
					}
				],
				organizationId: [
					{
						required: true,
						message: '请选择企业',
						trigger: 'change'
					}
				],
				electricityAfter: [
					{
						required: true,
						message: '请输入电量阈值后',
						trigger: 'blur'
					}
				],
				electricityFront: [
					{
						required: true,
						message: '请输入电量阈值前',
						trigger: 'blur'
					}
				],
				energy: [
					{
						required: true,
						message: '请输入主要耗能',
						trigger: 'blur'
					}
				],
				isDel: [
					{
						required: true,
						message: '请选择角色',
						trigger: 'change'
					}
				]
			},
			orgDisabled: false,
			enterpriseData: [],
			energyData: [],
			equipmentCodeData: [],
			productionProcessData: []
		};
	},
	watch: {
		selectData_p: {
			handler(newValue) {
				if (newValue.length > 0) {
					this.editId = newValue[0].id;
					this.hospitalLevelForm = { ...newValue[0] };
				}
			},
			deep: true,
			immediate: true
		}
	},
	created() {
		this.enterpriseList();
		this.productionProcessList();
		this.equipmentCodeList();
		this.energyConsumptionList();
		this.editId = this.editId_p;
		if (hgetStorage('organization')) {
			this.hospitalLevelForm.organizationId = hgetStorage('organization');
			this.orgDisabled = true;
		}
		if (this.editId !== -1) {
			this.getDetail();
		}
	},
	methods: {
		async enterpriseList() {
			const dataJson = {
				pageNum: 1,
				pageSize: 100000
			};
			const res = await enterpriseListService(dataJson);
			this.enterpriseData = res.records;
		},
		async energyConsumptionList() {
			const dataJson = {
				pageNum: this.pageIndex,
				pageSize: this.pageSize,
				...this.searchForm
			};
			const res = await energyConsumptionListService(dataJson);
			this.energyData = res.records;
		},
		async productionProcessList() {
			const dataJson = {
				pageNum: 1,
				pageSize: 100000000,
				...this.searchForm
			};
			const res = await productionProcessListService(dataJson);
			this.productionProcessData = res.records;
		},
		async equipmentCodeList() {
			const dataJson = {
				pageNum: 1,
				pageSize: 100000000,
				...this.searchForm
			};
			const res = await equipmentCodeListService(dataJson);
			this.equipmentCodeData = res.records;
		},
		async getDetail() {
			const dataJson = {
				equipmentId: this.editId
			};
			const res = await hospitalLevelDetailService(dataJson);
			this.hospitalLevelForm = { ...res };
		},
		hospitalLevelFormSubmit() {
			this.$refs.hospitalLevelForm.validate(async valid => {
				if (valid) {
					if (this.editId === -1) {
						await hospitalLevelAddService(this.hospitalLevelForm);
						this.$emit('update:isRefreshListAll_p', true);
					} else {
						const dataJson = {
							id: this.editId,
							...this.hospitalLevelForm
						};
						await hospitalLevelEditService(dataJson);
						this.$emit('update:isRefreshList_p', true);
					}
					this.hospitalLevelFormCancel();
				} else {
					this.$emit('update:isRefreshList_p', false);
					this.$emit('update:isRefreshListAll_p', false);
				}
			});
		},
		hospitalLevelFormCancel() {
			this.$emit('update:isShowAEDialog_p', false);
		}
	}
};
</script>

<style>
</style>
