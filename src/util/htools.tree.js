/*
 *@Description: 改变树的数据 ( id pid => children )
 *@MethodAuthor:  myw
 *@Date: 2020-12-07 09:16:38
 */
export const changeTreeDataToChildren = data => {
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
export const getTreeNodeById = (data, id, fn) => {
	if (data.length > 0) {
		for (let i = 0; i < data.length; i++) {
			if (data[i].id === id) {
				fn && fn(data[i]);
				Promise.resolve(data[i]);
				return false;
			}
			if (data[i].children) {
				getTreeNodeById(data[i].children, id, fn);
			}
		}
	}
};
/*
 *@Description: 删除树中某一个节点
 *@MethodAuthor:  myw
 *@Date: 2020-12-08 17:37:22
 */
export const deleteTreeNodeById = (sourceData, id) => {
	const tempArr = sourceData;
	if (tempArr.length !== 0) {
		for (let i = 0; i < tempArr.length; i++) {
			if (tempArr[i].id === id) {
				tempArr.splice(i, 1);
			} else if (tempArr[i].children) {
				deleteTreeNodeById(tempArr[i].children, id);
			}
		}
	}
	return tempArr;
};

export default changeTreeDataToChildren;
