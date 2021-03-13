/**
 * 浅拷贝是拷贝一层，深层次的对象级别的就拷贝引用
 */
function shadowCopy(obj) {
	var c = {};
	for (var i in obj) {
		c[i] = obj[i];
	}
	return c;
}

/**
 * 深拷贝是拷贝多层，每一级别的数据都会拷贝出来；
 */
function deepCopy(obj, target) {
	var c = target || {};
	for (var i in obj) {
		if (typeof obj[i] === 'object') {
			c[i] = obj[i].constructor === Array ? [] : {};
			deepCopy(obj[i], c[i]);
		} else {
			c[i] = obj[i];
		}
	}

	return c;
}


