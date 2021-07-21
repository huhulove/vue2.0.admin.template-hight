<template>
	<div id="app">
		<router-view />
	</div>
</template>

<style lang="less">
@import './theme/default.less';
* {
	padding: 0;
	margin: 0;
}
li {
	list-style: none;
}
a {
	text-decoration: none;
}
html,
body,
#app {
	height: 100%;
}
</style>
