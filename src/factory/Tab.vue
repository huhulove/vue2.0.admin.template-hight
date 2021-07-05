<template>
	<div id="tags-view-container" class="tags-view-container">
		<div class="scroll-container tags-view-wrapper el-scrollbar">
			<el-scrollbar>
				<span
					v-for="(item, index) in tabList"
					:key="index"
					class="tags-view-item router-link-exact-active router-link-active"
					:class="{ active: currentTab === index }"
				>
					<span @click="clickTabHandler(index)" @contextmenu.prevent="contextMenuHandler($event, index)">{{ item.title }}</span>

					<span
						v-if="tabList.length > 1 || $route.path !== '/home'"
						class="el-icon-close"
						@click="closeCurrentSingleTabHandler($event, index)"
					></span>
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
						this.tabList.push({
							title: this.$route.meta.title,
							path: this.$route.path,
							btnAuthorize: hgetStorage('btnPowers')
						});
						this.currentTab = this.tabList.length - 1;
					}, 300);
				} else {
					this.currentTab = cloneTabIndex;
				}
				if (hgetStorage('hasSaveEnterprise') === 1) {
					this.tabList.forEach((item, index) => {
						if (item.path === '/baseData/addEnterprise') {
							this.tabList.splice(index, 1);
						}
					});
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
	background: #fff;
	border-bottom: 1px solid #d8dce5;
	-webkit-box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
	box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
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
		border: 1px solid #d8dce5;
		color: #495060;
		background: #fff;
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
			background-color: #42b983;
			color: #fff;
			border-color: #42b983;
			&:before {
				content: '';
				background: #fff;
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
		background: #fff;
		z-index: 3000;
		position: absolute;
		list-style-type: none;
		padding: 5px 0;
		border-radius: 4px;
		font-size: 12px;
		font-weight: 400;
		color: #333;
		-webkit-box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
		box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
		li {
			margin: 0;
			padding: 7px 16px;
			cursor: pointer;
		}
	}
}
</style>
