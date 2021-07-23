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
	props: {
		/* 图片数组 */
		imageData_p: {
			type: Array,
			default: () => {
				return [];
			}
		},
		/* 图片宽度 */
		width_p: {
			type: Number
		},
		/* 图片高度 */
		height_p: {
			type: Number
		}
	}
};
</script>

<style>
</style>
