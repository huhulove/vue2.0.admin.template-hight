import Vue from 'vue';
import 'viewerjs/dist/viewer.css';
import Viewer from 'v-viewer';

Viewer.setDefaults({
	title: false,
	navbar: false,
	toolbar: {
		zoomIn: false,
		zoomOut: false,
		oneToOne: false,
		reset: false,
		prev: false,
		play: {
			show: false,
			size: 'large'
		},
		next: false,
		rotateLeft: false,
		rotateRight: false,
		flipHorizontal: false,
		flipVertical: false
	}
});

Vue.use(Viewer);
