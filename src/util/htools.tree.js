/*
 *@Description: 改变树的数据 ( id pid => children )
 *@MethodAuthor:  myw
 *@Date: 2020-12-07 09:16:38
 */
export const changeTreeDataToChildren = data => {
	if (!(data instanceof Array)) {
		return data;
	}
	if (data instanceof Array && data.length === 0) {
		return data;
	}
	// 删除 所有 children,以防止多次调用
	data.forEach(item => {
		delete item.children;
	});

	// 将数据存储为 以 id 为 KEY 的 map 索引数据列
	const map = {};
	data.forEach(item => {
		map[item.id || item.powerCode] = item;
	});
	const val = [];
	data.forEach(item => {
		// 以当前遍历项，的pid,去map对象中找到索引的id
		const parent = map[item.parentId || item.pid];
		// 好绕啊，如果找到索引，那么说明此项不在顶级当中,那么需要把此项添加到，他对应的父级中
		if (parent) {
			(parent.children || (parent.children = [])).push(item);
		} else {
			// 如果没有在map中找到对应的索引ID,那么直接把 当前的item添加到 val结果集中，作为顶级
			val.push(item);
		}
	});
	return val;
};
/*
 *@Description: 获取树中某一个节点
 *@MethodAuthor:  myw
 *@Date: 2020-12-07 09:16:38
 */
export const getTreeNodeById = (data, key, id, fn) => {
	if (data.length > 0) {
		for (let i = 0; i < data.length; i++) {
			if (data[i][key] === id) {
				fn && fn(data[i]);
				return false;
			}
			if (data[i].children) {
				getTreeNodeById(data[i].children, key, id, fn);
			}
		}
	}
};
/*
 *@Description: 通过树中某一个字段获取树中对应节点以及对应父节点
 *@MethodAuthor:  myw
 *@Date: 2020-12-16 15:21:15
 */
export const getTreePNodeByNodeId = (data, routeName, pnode, fn) => {
	if (data.length > 0) {
		for (let i = 0; i < data.length; i++) {
			if (data[i].routeName === routeName) {
				fn && fn(data[i], pnode);
				return false;
			}
			if (data[i].children) {
				getTreePNodeByNodeId(data[i].children, routeName, data[i], fn);
			}
		}
	}
};
/*
 *@Description: 删除树中某一个节点
 *@MethodAuthor:  myw
 *@Date: 2020-12-08 17:37:22
 */
export const deleteTreeNodeById = (sourceData, id, key = 'id') => {
	const tempArr = sourceData;
	if (tempArr.length !== 0) {
		for (let i = 0; i < tempArr.length; i++) {
			if (tempArr[i][key] === id) {
				tempArr.splice(i, 1);
			} else if (tempArr[i].children) {
				deleteTreeNodeById(tempArr[i].children, id, key);
			}
		}
	}
	return tempArr;
};
/*
 *@Description: 树中每个节点添加指定字段
 *@MethodAuthor:  myw
 *@Date: 2021-01-09 11:03:34
 */
export const addTreeKey = (data, level, json = {}) => {
	if (!(data instanceof Array)) {
		return data;
	}
	if (data instanceof Array && data.length === 0) {
		return data;
	}
	if (data.length > 0) {
		data.forEach(item => {
			let TLevel = 0 || level;
			item.open = false;
			item.disabled = true;
			item.level = TLevel;
			for (const key in json) {
				item[key] = item[json[key]];
			}
			if (item.children) {
				addTreeKey(item.children, ++TLevel, json);
			}
		});
		return data;
	}
};

export default changeTreeDataToChildren;
