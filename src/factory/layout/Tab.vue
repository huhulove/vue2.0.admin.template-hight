<template>
	<div id="tags-view-container" class="tags-view-container">
		<div class="scroll-container tags-view-wrapper el-scrollbar">
			<el-scrollbar>
				<span v-for="(item, index) in tabList" :key="index" class="tags-view-item router-link-exact-active router-link-active" :class="{ active: currentTab === index }">
					<span @click="clickTabHandler(index)" @contextmenu.prevent="contextMenuHandler($event, index)">{{ item.title }}</span>
					<span v-if="tabList.length > 1 || $route.path !== '/home'" class="el-icon-close" @click="closeCurrentSingleTabHandler($event, index)"></span>
				</span>
			</el-scrollbar>
		</div>
		<ul class="contextmenu" :style="{ left: style.left, top: style.top }" v-if="isShowContextMenu">
			<li @click="closeCurrentTabHandler">关闭</li>
			<li @click="closeOtherTabHandler">关闭其他</li>
			<li @click="closeAllTabHandler">关闭全部</li>
		</ul>
	</div>
</template>

<script>
import { hgetStorage, hsetStorage } from '@/util/htools.web';

export default {
	data() {
		return {
			isShowContextMenu: false,
			currentTab: 0,
			tabList: [],
			style: {
				left: 0,
				top: 0
			},
			contextMenuTabIndex: -1 // 索引
		};
	},
	watch: {
		$route: {
			handler() {
				const { title } = this.$route.meta;
				const { cloneTabIndex } = this.filterSameTabHandler(title);
				if (cloneTabIndex === -1) {
					setTimeout(() => {
						let isAddFlag = null;
						if (!this.$route.meta.tab) {
							isAddFlag = 1;
						} else {
							const { isAdd, parentRouteName } = this.$route.meta.tab;
							if (isAdd || isAdd === undefined) {
								isAddFlag = 1;
							} else if (!parentRouteName) {
								isAddFlag = 0;
							} else {
								isAddFlag = 2;
							}
						}
						if (isAddFlag === 1) {
							this.tabList.push({
								title: this.$route.meta.title,
								path: this.$route.fullPath,
								btnAuthorize: hgetStorage('btnPowers'),
								routeName: this.$route.name,
								isKeepAlive: this.$route.meta.isKeepAlive
							});
							this.currentTab = this.tabList.length - 1;
						} else if (isAddFlag === 0) {
							this.currentTab = -1;
						} else if (isAddFlag === 2) {
							const { parentRouteName } = this.$route.meta.tab;
							this.tabList.forEach((item, index) => {
								if (item.routeName === parentRouteName) {
									this.currentTab = index;
								}
							});
						}
					}, 300);
				} else {
					this.currentTab = cloneTabIndex;
				}
			},
			immediate: true
		}
	},
	mounted() {
		document.addEventListener(
			'click',
			() => {
				this.isShowContextMenu = false;
			},
			false
		);
	},
	methods: {
		filterSameTabHandler(title) {
			let cloneTab = null;
			let cloneTabIndex = -1;
			this.tabList.forEach((tab, index) => {
				if (tab.title === title) {
					cloneTab = tab;
					cloneTabIndex = index;
				}
			});
			return {
				cloneTab,
				cloneTabIndex
			};
		},
		clickTabHandler(tabIndex) {
			this.$router.push(this.tabList[tabIndex].path);
			hsetStorage('btnPowers', this.tabList[tabIndex].btnAuthorize);
		},
		contextMenuHandler(event, tabIndex) {
			this.contextMenuTabIndex = tabIndex;
			this.isShowContextMenu = true;
			const { clientX, clientY } = event;
			this.style.left = `${clientX}px`;
			this.style.top = `${clientY}px`;
		},
		// 关闭按钮关闭当前tab
		closeCurrentSingleTabHandler(event, tabIndex) {
			this.contextMenuTabIndex = tabIndex;
			this.isShowContextMenu = true;
			const { clientX, clientY } = event;
			this.style.left = `${clientX}px`;
			this.style.top = `${clientY}px`;
			this.closeCurrentTabHandler();
		},
		// 关闭
		closeCurrentTabHandler() {
			if (this.contextMenuTabIndex === 0 && this.tabList.length === 1) {
				this.tabList = [];
				this.$router.replace('/home');
				this.isShowContextMenu = false;
				return false;
			}
			if (this.contextMenuTabIndex === 0 && this.tabList.length !== 1) {
				this.currentTab = 0;
			} else {
				this.currentTab = this.contextMenuTabIndex - 1;
			}
			this.tabList.splice(this.contextMenuTabIndex, 1);
			this.$router.replace(this.tabList[this.currentTab].path);
			this.isShowContextMenu = false;
		},
		// 关闭全部
		closeAllTabHandler() {
			this.tabList = [];
			this.$router.replace('/home');
			this.isShowContextMenu = false;
		},
		// 关闭其他
		closeOtherTabHandler() {
			const contextMenuTab = this.tabList[this.contextMenuTabIndex];
			this.tabList = [contextMenuTab];
			this.currentTab = 0;
			this.isShowContextMenu = false;
			this.$router.push(contextMenuTab.path);
			hsetStorage('btnPowers', contextMenuTab.btnAuthorize);
		}
	}
};
</script>

<style scoped lang="less">
.tags-view-container {
	height: 34px;
	width: 100%;
	.scroll-container {
		white-space: nowrap;
		position: relative;
		overflow: hidden;
		width: 100%;
		.el-scrollbar__wrap {
			height: 49px;
		}
		.el-scrollbar__bar {
			bottom: 0;
		}
	}
	.tags-view-wrapper .tags-view-item {
		display: inline-block;
		position: relative;
		cursor: pointer;
		height: 26px;
		line-height: 26px;
		padding: 0 8px;
		font-size: 12px;
		margin-left: 5px;
		margin-top: 4px;
		&:first-of-type {
			margin-left: 15px;
		}
		&:last-of-type {
			margin-right: 15px;
		}
		&.active {
			&:before {
				content: '';
				display: inline-block;
				width: 8px;
				height: 8px;
				border-radius: 50%;
				position: relative;
				margin-right: 2px;
			}
		}
	}
	.contextmenu {
		margin: 0;
		z-index: 3000;
		position: absolute;
		list-style-type: none;
		padding: 5px 0;
		border-radius: 4px;
		font-size: 12px;
		font-weight: 400;
		li {
			margin: 0;
			padding: 7px 16px;
			cursor: pointer;
		}
	}
}
</style>
