import Vue from 'vue';
import { htimeFormat } from '@u/htools.web.js';

Vue.filter('formatDate', value => {
	return htimeFormat(value);
});
