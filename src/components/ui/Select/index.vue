<template>
	<el-select v-bind="$attrs" v-on="$listeners" class="select-item" filterable clearable>
		<slot></slot>
		<el-option
			v-for="item in optionsData_p"
			:key="item[(optionJson_p && optionJson_p.value) || 'id']"
			:label="item[(optionJson_p && optionJson_p.label) || 'name']"
			:value="item[(optionJson_p && optionJson_p.value) || 'id']"
		></el-option>
	</el-select>
</template>

<script>
export default {
	inheritAttrs: false,
	props: ['optionsData_p', 'optionJson_p']
};
</script>

<style lang="less">
.select-item {
	width: 100%;
}
</style>
