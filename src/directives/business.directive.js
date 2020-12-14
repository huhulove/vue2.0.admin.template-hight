import Vue from 'vue';
import { hgetStorage } from '../util/htools.web';

Vue.directive('authorize', {
	inserted(el, binding) {
		const { name, type, id } = binding.value;
		setTimeout(() => {
			const btnPowers = hgetStorage('btnPowers');
			if (btnPowers.indexOf(`${type}:${name}`) > -1) {
				el.style.display = 'inline-block';
			} else {
				document.getElementById(id).remove();
			}
		}, 20);
	}
});
