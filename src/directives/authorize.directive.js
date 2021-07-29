import Vue from 'vue';
import { hgetStorage } from '../util/htools.web';

/* 判断按钮权限 */
Vue.directive('authorize', {
	inserted(el, binding) {
		const { name, type, id } = binding.value;
		el.style.display = 'none';
		setTimeout(() => {
			const btnAuthorizes = hgetStorage('btnAuthorizeCodes');
			if (btnAuthorizes && btnAuthorizes.indexOf(`${type}:${name}`) > -1) {
				el.style.display = 'inline-block';
			} else {
				document.getElementById(id).remove();
			}
		}, 20);
	}
});
