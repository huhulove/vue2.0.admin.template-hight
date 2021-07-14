<template>
	<div>
		<viewer v-if="imageData_p.length > 1" :images="imageData_p">
			<img v-for="(src, index) in imageData_p" :src="src" :key="index" :width="width_p" :height="height_p" />
		</viewer>
		<viewer v-else :images="imageData_p">
			<img :src="imageData_p[0]" :width="width_p" :height="height_p" />
		</viewer>
	</div>
</template>

<script>
import './initViewer';

export default {
	props: ['imageData_p', 'width_p', 'height_p']
};
</script>

<style>
</style>
