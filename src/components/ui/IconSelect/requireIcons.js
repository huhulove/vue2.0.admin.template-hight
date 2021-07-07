const req = require.context('../../../assets/icons/svg', false, /\.svg$/);
const requireAll = requireContext => {
	return requireContext.keys();
};

const re = /\.\/(.*)\.svg/;

const icons = requireAll(req).map(i => {
	return i.match(re)[1];
});

export default icons;
