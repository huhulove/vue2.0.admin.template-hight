<template>
	<iframe :src="url" frameborder="0" class="iframe-container"></iframe>
</template>

<script>
export default {
	data() {
		return {
			url: ''
		};
	},
	created() {
		this.url = this.$route.query.url;
	}
};
</script>

<style scoped>
.iframe-container {
	width: calc(100%);
	height: calc(100% - 4px);
}
</style>
