const path = require('path');

function resolve(dir) {
	return path.join(__dirname, dir);
}

module.exports = {
	chainWebpack: config => {
		config.resolve.alias
			.set('@', resolve('src'))
			.set('@f', resolve('src/factory'))
			.set('@c', resolve('src/components'))
			.set('@s', resolve('src/service'))
			.set('@m', resolve('src/mixins'))
			.set('@u', resolve('src/util'));
		config.module
			.rule('svg')
			.exclude.add(resolve('src/assets/icons'))
			.end();
		config.module
			.rule('icons')
			.test(/\.svg$/)
			.include.add(resolve('src/assets/icons'))
			.end()
			.use('svg-sprite-loader')
			.loader('svg-sprite-loader')
			.options({
				symbolId: 'icon-[name]'
			})
			.end();
	},
	devServer: {
		proxy: {
			'/api': {
				target: 'http://192.168.1.222/api',
				changeOrigin: true,
				secure: false,
				pathRewrite: {
					'^/api': ''
				}
			}
		}
	}
};
